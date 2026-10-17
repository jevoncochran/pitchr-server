import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BusinessCardScanStatus, ContactSource, Prisma } from '@prisma/client';
import sharp = require('sharp');
import { postToPitchrAi } from 'src/common/pitchr-ai';
import { DatabaseService } from 'src/database/database.service';
import {
  BusinessCardReading,
  ExistingContact,
  PersonPlan,
  PhotoBusinessCardData,
  planBusinessCardScan,
  planPerson,
} from './business-card-scan-rules';

// Reading business cards takes a few seconds (more with several photos); give up after 90.
const SCAN_TIMEOUT_MS = 90_000;

// A scan still PENDING after this was interrupted (e.g. a restart) and counts as FAILED.
const STALE_SCAN_MS = 5 * 60_000;

// Photos are shrunk before Claude reads them: a bigger image doesn't read better
// and costs more. The original in R2 is unchanged.
const MAX_EDGE_PX = 1568;

const SCAN_INCLUDE = {
  lead: {
    select: {
      id: true,
      business: true,
      website: true,
      contacts: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          title: true,
          email: true,
          phone: true,
          isDecisionMaker: true,
        },
      },
    },
  },
} satisfies Prisma.AttachmentInclude;

/**
 * Business card scan (docs/business-card-scan.md): photos uploaded to a lead
 * are read together (up to 6: several people's business cards and a back they
 * share). Each person becomes a new contact or fills in an existing one.
 */
@Injectable()
export class BusinessCardScanService {
  private readonly logger = new Logger(BusinessCardScanService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  /** Images on a lead are read; everything else (PDFs, videos, contact-page uploads) isn't. */
  isScannable(file: { mimeType: string; leadId: string | null }) {
    return file.mimeType.startsWith('image/') && !!file.leadId;
  }

  /** Read the photos without making the caller wait. Failures are recorded as FAILED. */
  scanInBackground(
    attachmentIds: string[],
    userId?: string,
    originals?: (Buffer | undefined)[],
  ) {
    // scan() records its own failures; this only catches one that couldn't be
    // recorded (e.g. the photos were deleted meanwhile)
    this.scan(attachmentIds, userId, originals).catch((error) =>
      this.logger.error(
        `Business card scan of ${attachmentIds.join(', ')} failed: ${error}`,
      ),
    );
  }

  /**
   * Read photos uploaded together and apply what they say. Never throws: a
   * failure is saved as FAILED on every photo. `originals` saves downloading
   * photos just uploaded.
   */
  async scan(
    attachmentIds: string[],
    userId?: string,
    originals?: (Buffer | undefined)[],
  ) {
    try {
      const photos = await this.findPhotos(attachmentIds);
      const reading = await readBusinessCards(
        photos.map((photo, i) => ({
          url: photo.url,
          original: originals?.[i],
        })),
        photos[0].lead!,
      );
      await this.applyReading(attachmentIds, reading, userId);
    } catch (error) {
      this.logger.error(
        `Business card scan of ${attachmentIds.join(', ')} failed: ${error}`,
      );
      await this.databaseService.attachment.updateMany({
        where: { id: { in: attachmentIds } },
        data: {
          businessCardScan: BusinessCardScanStatus.FAILED,
          businessCardScannedAt: new Date(),
        },
      });
    }
  }

  /** Try a FAILED scan again, in the background, with the photos uploaded alongside it. */
  async retry(attachmentId: string, userId?: string) {
    const attachment = await this.findOrThrow(attachmentId);
    if (attachment.businessCardScan !== BusinessCardScanStatus.FAILED) {
      throw new BadRequestException('Only a failed scan can be tried again');
    }
    const batch = attachment.businessCardBatchId
      ? await this.databaseService.attachment.findMany({
          where: {
            businessCardBatchId: attachment.businessCardBatchId,
            businessCardScan: BusinessCardScanStatus.FAILED,
          },
          orderBy: { createdAt: 'asc' },
          select: { id: true },
        })
      : [{ id: attachmentId }];
    const ids = batch.map((photo) => photo.id);
    await this.databaseService.attachment.updateMany({
      where: { id: { in: ids } },
      data: {
        businessCardScan: BusinessCardScanStatus.PENDING,
        businessCardScannedAt: null,
      },
    });
    this.scanInBackground(ids, userId);
    return this.findOrThrow(attachmentId);
  }

  /**
   * The owner picked who a NEEDS_MATCH business card belongs to: one of the
   * lead's contacts, or 'new'. Uses what was already read; no second Claude call.
   */
  resolveMatch(attachmentId: string, contactId: string, userId?: string) {
    return this.decide(
      attachmentId,
      BusinessCardScanStatus.NEEDS_MATCH,
      "This business card isn't waiting for a contact",
      { contactId },
      userId,
    );
  }

  /** "Add anyway": a business card for another business is taken as this lead's. */
  addAnyway(attachmentId: string, userId?: string) {
    return this.decide(
      attachmentId,
      BusinessCardScanStatus.OTHER_BUSINESS,
      "This business card isn't for another business",
      { addAnyway: true },
      userId,
    );
  }

  /** The photos of the same person's business card (to remove them together). */
  async samePersonPhotoIds(attachmentId: string) {
    const attachment = await this.findOrThrow(attachmentId);
    const data = photoData(attachment);
    if (!attachment.businessCardBatchId || data?.personIndex == null) {
      return [attachmentId];
    }
    const batch = await this.databaseService.attachment.findMany({
      where: { businessCardBatchId: attachment.businessCardBatchId },
    });
    return batch
      .filter((photo) => photoData(photo)?.personIndex === data.personIndex)
      .map((photo) => photo.id);
  }

  /**
   * What a reading would change, against the lead as it is now. Saves nothing
   * (the backfill's dry run).
   */
  async planReading(attachmentIds: string[], reading: BusinessCardReading) {
    const lead = (await this.findPhotos(attachmentIds))[0].lead!;
    return planBusinessCardScan(reading, lead.contacts, lead.website);
  }

  /** Apply a reading (new from Claude, or saved) to the lead as it is now. */
  async applyReading(
    attachmentIds: string[],
    reading: BusinessCardReading,
    userId?: string,
  ) {
    const lead = (await this.findPhotos(attachmentIds))[0].lead!;
    const plan = planBusinessCardScan(reading, lead.contacts, lead.website);
    const idsAt = (positions: number[]) =>
      positions.map((p) => attachmentIds[p]).filter(Boolean);

    await this.databaseService.$transaction(async (tx) => {
      for (const { personIndex, photos, plan: personPlan } of plan.people) {
        await applyPersonPlan(tx, {
          plan: personPlan,
          photoIds: idsAt(photos),
          data: {
            role: 'person',
            person: reading.people[personIndex],
            personIndex,
            business: reading.business,
          },
          leadId: lead.id,
          userId,
        });
      }
      const others = [
        {
          ids: idsAt(plan.businessOnlyPhotos),
          role: 'business' as const,
          status: BusinessCardScanStatus.BUSINESS_CARD,
        },
        {
          ids: idsAt(plan.notBusinessCardPhotos),
          role: 'not_business_card' as const,
          status: BusinessCardScanStatus.NOT_BUSINESS_CARD,
        },
      ];
      for (const { ids, role, status } of others) {
        if (ids.length === 0) continue;
        await tx.attachment.updateMany({
          where: { id: { in: ids } },
          data: {
            businessCardScan: status,
            businessCardScannedAt: new Date(),
            businessCardData: json({
              role,
              person: null,
              personIndex: null,
              business: reading.business,
            }),
          },
        });
      }
      if (plan.leadWebsite) {
        // Only when still empty, in case it was filled in meanwhile
        await tx.lead.updateMany({
          where: { id: lead.id, OR: [{ website: null }, { website: '' }] },
          data: { website: plan.leadWebsite },
        });
      }
    });
    return plan;
  }

  /** Scans interrupted before finishing (a restart) show as FAILED so they can be retried. */
  async expireStaleScans(leadId: string) {
    await this.databaseService.attachment.updateMany({
      where: {
        leadId,
        businessCardScan: BusinessCardScanStatus.PENDING,
        createdAt: { lt: new Date(Date.now() - STALE_SCAN_MS) },
      },
      data: { businessCardScan: BusinessCardScanStatus.FAILED },
    });
  }

  /** Apply the owner's decision on one person's business card (all its photos). */
  private async decide(
    attachmentId: string,
    expected: BusinessCardScanStatus,
    wrongStatus: string,
    options: { contactId?: string; addAnyway?: boolean },
    userId?: string,
  ) {
    const attachment = await this.databaseService.attachment.findUnique({
      where: { id: attachmentId },
      include: SCAN_INCLUDE,
    });
    if (!attachment?.lead) throw new NotFoundException('Photo not found');
    if (attachment.businessCardScan !== expected) {
      throw new BadRequestException(wrongStatus);
    }
    const contacts = attachment.lead.contacts;
    const { contactId } = options;
    if (
      contactId &&
      contactId !== 'new' &&
      !contacts.some((c) => c.id === contactId)
    ) {
      throw new BadRequestException('That contact is not on this lead');
    }
    const data = photoData(attachment);
    if (!data?.person) {
      throw new BadRequestException(
        'No person was read from this business card',
      );
    }

    const plan = planPerson(data.person, contacts, options);
    const photoIds = await this.samePersonPhotoIds(attachmentId);
    const leadId = attachment.lead.id;
    await this.databaseService.$transaction((tx) =>
      applyPersonPlan(tx, { plan, photoIds, data, leadId, userId }),
    );
    return this.findOrThrow(attachmentId);
  }

  /** The photos, in the order given, all on one lead. */
  private async findPhotos(attachmentIds: string[]) {
    const found = await this.databaseService.attachment.findMany({
      where: { id: { in: attachmentIds } },
      include: SCAN_INCLUDE,
    });
    const photos = attachmentIds.map((id) =>
      found.find((photo) => photo.id === id),
    );
    if (photos.length === 0 || photos.some((photo) => !photo?.lead)) {
      throw new NotFoundException('Photo not found');
    }
    if (new Set(photos.map((photo) => photo!.lead!.id)).size !== 1) {
      throw new BadRequestException('Photos read together must be on one lead');
    }
    return photos as NonNullable<(typeof photos)[number]>[];
  }

  private async findOrThrow(attachmentId: string) {
    const attachment = await this.databaseService.attachment.findUnique({
      where: { id: attachmentId },
    });
    if (!attachment) throw new NotFoundException('Photo not found');
    return attachment;
  }
}

/** Save what one person's business card changes, and mark its photos. */
async function applyPersonPlan(
  tx: Prisma.TransactionClient,
  args: {
    plan: PersonPlan;
    photoIds: string[];
    data: PhotoBusinessCardData;
    leadId: string;
    userId?: string;
  },
) {
  const { plan, photoIds, data, leadId, userId } = args;
  let contactId = plan.contactId ?? null;

  if (plan.createContact) {
    const contact = await tx.contact.create({
      data: {
        ...plan.createContact,
        howWeMet: ContactSource.IN_PERSON,
        leadId,
        userId: userId ?? null,
      },
    });
    contactId = contact.id;
  }
  if (plan.updateContact) {
    await tx.contact.update({
      where: { id: plan.updateContact.id },
      data: plan.updateContact.data,
    });
  }
  for (const suggestion of plan.suggestions) {
    // The latest business card wins: one suggestion per contact and field
    await tx.contactChangeSuggestion.upsert({
      where: {
        contactId_field: {
          contactId: suggestion.contactId,
          field: suggestion.field,
        },
      },
      create: { ...suggestion, attachmentId: photoIds[0] },
      update: {
        currentValue: suggestion.currentValue,
        suggestedValue: suggestion.suggestedValue,
        attachmentId: photoIds[0],
      },
    });
  }
  await tx.attachment.updateMany({
    where: { id: { in: photoIds } },
    data: {
      businessCardScan: plan.status,
      businessCardScannedAt: new Date(),
      businessCardData: json(data),
      ...(contactId ? { contactId } : {}),
    },
  });
}

/** What was read for a photo (see PhotoBusinessCardData). */
export function photoData(photo: { businessCardData: Prisma.JsonValue }) {
  return photo.businessCardData as unknown as PhotoBusinessCardData | null;
}

function json(data: PhotoBusinessCardData) {
  return data as unknown as Prisma.InputJsonValue;
}

/**
 * Have pitchr-ai read photos uploaded together: each straightened and shrunk,
 * sent with the lead's business name and contacts (or, for a new lead, the
 * industry and business type lists). `original` saves downloading a photo just uploaded.
 */
export async function readBusinessCards(
  photos: { url: string; original?: Buffer }[],
  context: ExistingLeadContext | NewLeadContext,
): Promise<BusinessCardReading> {
  const images = await Promise.all(
    photos.map(async ({ url, original }) =>
      shrink(original ?? (await download(url))),
    ),
  );
  return postToPitchrAi<BusinessCardReading>(
    '/business-cards/scan',
    {
      photos: images.map((image) => ({
        data: image.toString('base64'),
        mediaType: 'image/jpeg',
      })),
      ...('business' in context
        ? { business: context.business, contacts: context.contacts }
        : {
            industries: context.industries,
            businessTypes: context.businessTypes,
          }),
    },
    SCAN_TIMEOUT_MS,
  );
}

/** Business cards read for an existing lead: matched against its contacts. */
export interface ExistingLeadContext {
  business: string;
  contacts: ExistingContact[];
}

/** Business cards that start a new lead: industry and business type suggested from these. */
export interface NewLeadContext {
  industries: { id: string; name: string }[];
  businessTypes: { id: string; name: string }[];
}

/** The photo as stored in R2 (its URL is public). */
async function download(url: string): Promise<Buffer> {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok)
    throw new Error(`Downloading the photo returned ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

/** Upright (phone photos store rotation separately), at most MAX_EDGE_PX, JPEG. */
function shrink(image: Buffer): Promise<Buffer> {
  return sharp(image)
    .rotate()
    .resize({
      width: MAX_EDGE_PX,
      height: MAX_EDGE_PX,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 85 })
    .toBuffer();
}
