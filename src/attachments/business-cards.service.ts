import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { toJpegIfHeic } from 'src/common/images';
import { DatabaseService } from 'src/database/database.service';
import { StorageService } from 'src/storage/storage.service';
import { MAX_BUSINESS_CARD_PHOTOS } from './attachments.service';
import {
  likelyDuplicates,
  PhotoBusinessCardData,
} from './business-card-scan-rules';
import {
  BusinessCardScanService,
  readBusinessCards,
} from './business-card-scan.service';

/**
 * Add Lead's "Fill in from business card" (docs/business-card-scan.md):
 * business cards read before there's a lead, while the owner waits.
 */
@Injectable()
export class BusinessCardsService {
  private readonly logger = new Logger(BusinessCardsService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storageService: StorageService,
    private readonly businessCardScanService: BusinessCardScanService,
  ) {}

  /**
   * Store new photos (on no lead yet) and read them, together with photos read
   * earlier for the same form ("Add the back or another card"). Answers with
   * every photo, what was read and the leads it might already be. If reading
   * fails, the new photos aren't kept.
   */
  async readForNewLead(
    uploads: Express.Multer.File[],
    earlierIds: string[] = [],
  ) {
    if (uploads.length === 0)
      throw new BadRequestException('No photos provided');
    if (uploads.length + earlierIds.length > MAX_BUSINESS_CARD_PHOTOS) {
      throw new BadRequestException(
        `Up to ${MAX_BUSINESS_CARD_PHOTOS} photos at a time`,
      );
    }
    if (uploads.some((upload) => !upload.mimetype.startsWith('image/'))) {
      throw new BadRequestException('A business card must be a photo');
    }

    const earlier = await this.databaseService.attachment.findMany({
      where: { id: { in: earlierIds }, leadId: null, contactId: null },
    });
    if (earlier.length !== earlierIds.length) {
      throw new BadRequestException('Those photos are already on a lead');
    }
    const batchId = earlier[0]?.businessCardBatchId ?? randomUUID();

    const files = await Promise.all(
      uploads.map((upload) => this.asJpeg(upload)),
    );
    const added: { id: string; key: string }[] = [];
    try {
      for (const file of files) {
        const { url, key } = await this.storageService.upload(
          file,
          'business-cards',
        );
        const attachment = await this.databaseService.attachment.create({
          data: {
            url,
            key,
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            businessCardBatchId: batchId,
          },
        });
        added.push({ id: attachment.id, key });
      }

      const [industries, businessTypes] = await Promise.all([
        this.databaseService.industry.findMany({
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        }),
        this.databaseService.businessType.findMany({
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        }),
      ]);
      // In upload order: the earlier photos, then the new ones
      const ordered = [
        ...earlierIds.map((id) => earlier.find((photo) => photo.id === id)!),
        ...added.map(({ id }, i) => ({
          id,
          url: '',
          original: files[i].buffer,
        })),
      ];
      const reading = await readBusinessCards(
        ordered.map((photo) => ({
          url: photo.url,
          original: 'original' in photo ? photo.original : undefined,
        })),
        { industries, businessTypes },
      );

      // Each photo keeps what was read for it (its role, its person)
      const ids = ordered.map((photo) => photo.id);
      const dataFor = (position: number): PhotoBusinessCardData => {
        const personIndex = reading.people.findIndex((person) =>
          person.photos.includes(position),
        );
        if (personIndex >= 0) {
          return {
            role: 'person',
            person: reading.people[personIndex],
            personIndex,
            business: reading.business,
          };
        }
        return {
          role: reading.notBusinessCardPhotos.includes(position)
            ? 'not_business_card'
            : 'business',
          person: null,
          personIndex: null,
          business: reading.business,
        };
      };
      const attachments = [];
      for (const [position, id] of ids.entries()) {
        attachments.push(
          await this.databaseService.attachment.update({
            where: { id },
            data: {
              businessCardBatchId: batchId,
              businessCardData: dataFor(
                position,
              ) as unknown as Prisma.InputJsonValue,
              businessCardScannedAt: new Date(),
            },
          }),
        );
      }

      const leads = await this.databaseService.lead.findMany({
        select: {
          id: true,
          business: true,
          website: true,
          email: true,
          contacts: { select: { email: true, phone: true } },
        },
      });
      return {
        attachments,
        reading,
        duplicates: likelyDuplicates(reading, leads),
      };
    } catch (error) {
      this.logger.error(
        `Reading business cards for a new lead failed: ${error}`,
      );
      for (const { id, key } of added) {
        await this.databaseService.attachment
          .delete({ where: { id } })
          .catch(() => {});
        await this.storageService.delete(key).catch(() => {});
      }
      throw new BadGatewayException("Couldn't read these business cards");
    }
  }

  /** iPhone photos (HEIC) become JPEG; a photo that can't be opened is refused. */
  private async asJpeg(upload: Express.Multer.File) {
    try {
      return await toJpegIfHeic(upload);
    } catch (error) {
      this.logger.error(`Converting a HEIC photo failed: ${error}`);
      throw new BadRequestException("Couldn't open this photo");
    }
  }

  /**
   * "Add this business card there": the photos go on an existing lead and are
   * read again together in the background, this time against that lead's contacts.
   */
  async addToLead(attachmentIds: string[], leadId: string, userId?: string) {
    if (attachmentIds.length === 0) {
      throw new BadRequestException('No photos given');
    }
    const lead = await this.databaseService.lead.findUnique({
      where: { id: leadId },
      select: { id: true },
    });
    if (!lead) throw new NotFoundException('Lead not found');

    const batchId = randomUUID();
    const { count } = await this.databaseService.attachment.updateMany({
      // Only business cards read for a new lead and not used yet
      where: { id: { in: attachmentIds }, leadId: null, contactId: null },
      data: {
        leadId,
        businessCardScan: 'PENDING',
        businessCardScannedAt: null,
        businessCardBatchId: batchId,
      },
    });
    if (count !== attachmentIds.length) {
      throw new BadRequestException(
        'These business cards are already on a lead',
      );
    }
    this.businessCardScanService.scanInBackground(attachmentIds, userId);
    return this.databaseService.attachment.findMany({
      where: { id: { in: attachmentIds } },
    });
  }
}
