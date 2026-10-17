import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BusinessCardScanStatus,
  ContactSource,
  PipelineStage,
  Prisma,
} from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { lookUpCoordinates } from 'src/locations/locations.service';
import {
  changeStage,
  parseConvertedAt,
  recordInitialStage,
} from './lead-stage';
import { originFields } from './lead-origin';

/**
 * What Add Lead can send besides the lead itself (docs/business-card-scan.md):
 * the address, contacts, how we met, and the business card photos that filled
 * the form in. All saved with the lead, or none of it.
 */
export interface NewLeadDetails {
  location?: {
    addressLine1: string;
    city: string;
    state: string;
    zip?: string | null;
    // Only when picked from the address search; otherwise looked up
    latitude?: number | null;
    longitude?: number | null;
    googlePlaceId?: string | null;
  } | null;
  contacts?: {
    firstName: string;
    lastName?: string | null;
    title?: string | null;
    email?: string | null;
    phone?: string | null;
    isDecisionMaker?: boolean;
    /** The photos of this person's business card, linked to the contact */
    businessCardAttachmentIds?: string[];
  }[];
  howWeMet?: string | null;
  /** Every business card photo to keep with the lead (people's and shared backs) */
  businessCardAttachmentIds?: string[];
}

@Injectable()
export class LeadsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createLeadDto: Prisma.LeadCreateInput,
    userId: string,
    details: NewLeadDetails = {},
  ) {
    const { convertedAt, ...data } = createLeadDto;
    const requestedConvertedAt = parseConvertedAt(convertedAt ?? undefined);
    const { location } = details;
    const contacts = details.contacts ?? [];
    const photoIds = [...new Set(details.businessCardAttachmentIds ?? [])];
    const howWeMet = details.howWeMet?.trim() || null;

    if (
      location &&
      !(
        location.addressLine1?.trim() &&
        location.city?.trim() &&
        location.state?.trim()
      )
    ) {
      throw new BadRequestException(
        'An address needs a street, city and state',
      );
    }
    if (contacts.some((contact) => !contact.firstName?.trim())) {
      throw new BadRequestException('A contact needs a first name');
    }
    if (
      contacts.some((contact) =>
        (contact.businessCardAttachmentIds ?? []).some(
          (id) => !photoIds.includes(id),
        ),
      )
    ) {
      throw new BadRequestException(
        "A contact's business card must be one of the lead's",
      );
    }
    // Looked up before the transaction: a Google call shouldn't hold it open
    const coordinates =
      location && location.latitude == null
        ? await lookUpCoordinates(location)
        : null;

    return this.databaseService.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          ...data,
          ...originFields(data),
          ...(data.pipelineStage === PipelineStage.CONVERTED && {
            convertedAt: requestedConvertedAt ?? new Date(),
          }),
        },
      });
      // The lead's first stage starts its stage history
      await recordInitialStage(tx, lead, userId);

      if (location) {
        const saved = await tx.location.create({
          data: {
            addressLine1: location.addressLine1.trim(),
            city: location.city.trim(),
            state: location.state.trim(),
            zip: location.zip?.trim() ?? '',
            latitude: location.latitude ?? null,
            longitude: location.longitude ?? null,
            googlePlaceId: location.googlePlaceId ?? null,
            ...coordinates,
            businessId: lead.id,
          },
        });
        await tx.lead.update({
          where: { id: lead.id },
          data: { primaryLocationId: saved.id },
        });
      }

      const savedContacts = [];
      for (const contact of contacts) {
        const fromBusinessCard =
          (contact.businessCardAttachmentIds ?? []).length > 0;
        savedContacts.push(
          await tx.contact.create({
            data: {
              firstName: contact.firstName.trim(),
              lastName: contact.lastName?.trim() || null,
              title: contact.title?.trim() || null,
              email: contact.email?.trim() || null,
              phone: contact.phone?.trim() || null,
              isDecisionMaker: contact.isDecisionMaker ?? false,
              // Someone who handed us their business card, we met in person
              howWeMet: fromBusinessCard ? ContactSource.IN_PERSON : null,
              howWeMetNote: howWeMet,
              leadId: lead.id,
              userId,
            },
          }),
        );
      }

      if (howWeMet) {
        await tx.note.create({
          data: {
            text: `How we met: ${howWeMet}`,
            leadId: lead.id,
            contactId: savedContacts.length === 1 ? savedContacts[0].id : null,
            userId,
          },
        });
      }

      if (photoIds.length > 0) {
        // Only business cards read for this form and not used yet
        const { count } = await tx.attachment.updateMany({
          where: { id: { in: photoIds }, leadId: null, contactId: null },
          data: {
            leadId: lead.id,
            businessCardScan: BusinessCardScanStatus.BUSINESS_CARD,
          },
        });
        if (count !== photoIds.length) {
          throw new BadRequestException(
            'Those business cards are already on another lead',
          );
        }
        for (const [i, contact] of contacts.entries()) {
          const ids = contact.businessCardAttachmentIds ?? [];
          if (ids.length === 0) continue;
          await tx.attachment.updateMany({
            where: { id: { in: ids } },
            data: { contactId: savedContacts[i].id },
          });
        }
      }

      return lead;
    });
  }

  async findAll() {
    return this.databaseService.lead.findMany({
      include: {
        industry: true,
        businessType: true,
        touchPoint: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true },
        },
        referredByLead: {
          select: { id: true, business: true },
        },
      },
    });
  }

  async findNewUncoctactedLeads() {
    const newUncoctactedLeads = [];
    const allLeads = await this.databaseService.lead.findMany();

    for (const lead of allLeads) {
      const touchpoints = await this.databaseService.touchPoint.findMany({
        where: { leadId: lead.id },
      });

      if (touchpoints.length === 0) {
        newUncoctactedLeads.push(lead);
      }
    }

    return newUncoctactedLeads;
  }

  async findPostVisitLeads() {
    const allLeads = await this.databaseService.lead.findMany();
    const postVisitLeads = [];

    for (const lead of allLeads) {
      // Get all touchpoints for this lead, most recent first
      const touchpoints = await this.databaseService.touchPoint.findMany({
        where: { leadId: lead.id },
        orderBy: { date: 'desc' },
      });

      if (touchpoints.length > 0) {
        const mostRecent = touchpoints[0];

        // If most recent touchpoint was in person, add to list
        if (mostRecent.type === 'IN_PERSON') {
          postVisitLeads.push(lead);
        }
      }
    }

    return postVisitLeads;
  }

  async findEstrangedLeads() {
    const allLeads = await this.databaseService.lead.findMany();
    const estrangedLeads = [];

    for (const lead of allLeads) {
      const touchpoints = await this.databaseService.touchPoint.findMany({
        where: { leadId: lead.id },
        orderBy: { date: 'desc' },
        take: 1, // only need the most recent
      });

      // If 7 days or more have passed since most recent touchpoint, add to the list
      if (touchpoints.length > 0) {
        const mostRecent = touchpoints[0];
        const now = new Date();
        const diffInDays =
          (now.getTime() - new Date(mostRecent.date).getTime()) /
          (1000 * 60 * 60 * 24);

        if (diffInDays >= 7) {
          estrangedLeads.push(lead);
        }
      }
    }

    return estrangedLeads;
  }

  async findOne(id: string) {
    return this.databaseService.lead.findUnique({
      where: { id },
      include: {
        industry: true,
        businessType: true,
        locations: {
          include: { phoneNumbers: true },
        },
        touchPoint: {
          orderBy: { date: 'desc' },
          include: {
            contactedBy: {
              select: { id: true, firstName: true, lastName: true },
            },
            contacts: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
              },
            },
          },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        tasks: {
          orderBy: { dueDate: 'asc' },
        },
        signals: {
          orderBy: { date: 'desc' },
        },
        contacts: {
          orderBy: [{ isDecisionMaker: 'desc' }, { createdAt: 'asc' }],
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true },
        },
        referredByLead: {
          select: { id: true, business: true },
        },
      },
    });
  }

  /**
   * Updates a lead. A stage change (pipelineStage) goes through changeStage, so
   * it's recorded in the stage history and the conversion date stays correct.
   * convertedAt on its own can only be edited (e.g. backdated) on a Converted lead.
   */
  async update(
    id: string,
    updateLeadDto: Prisma.LeadUpdateInput,
    userId: string,
  ) {
    const { pipelineStage, convertedAt, ...rest } = updateLeadDto;
    if (pipelineStage !== undefined && typeof pipelineStage !== 'string') {
      throw new BadRequestException('pipelineStage must be a stage name');
    }
    if (convertedAt === null) {
      throw new BadRequestException(
        'To remove a conversion, move the lead out of Converted',
      );
    }
    const requestedConvertedAt = parseConvertedAt(convertedAt);

    return this.databaseService.$transaction(async (tx) => {
      const lead = await tx.lead.findUnique({
        where: { id },
        select: { id: true, pipelineStage: true },
      });
      if (!lead) throw new NotFoundException('Lead not found');

      const data: Prisma.LeadUpdateInput = { ...rest };
      // The origin and its description are saved together
      if ('origin' in rest) Object.assign(data, originFields(rest));
      else delete data.originOther;
      if (pipelineStage && pipelineStage !== lead.pipelineStage) {
        Object.assign(
          data,
          await changeStage(
            tx,
            lead,
            pipelineStage,
            userId,
            requestedConvertedAt,
          ),
        );
      } else if (requestedConvertedAt) {
        if (lead.pipelineStage !== PipelineStage.CONVERTED) {
          throw new BadRequestException(
            'Only converted leads have a conversion date',
          );
        }
        data.convertedAt = requestedConvertedAt;
      }

      return tx.lead.update({ where: { id }, data });
    });
  }

  async remove(id: string) {
    return this.databaseService.lead.delete({ where: { id } });
  }
}
