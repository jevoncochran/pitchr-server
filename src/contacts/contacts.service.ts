import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TouchPointType } from '@prisma/client';
import {
  BUSINESS_CARD_FIELDS,
  BusinessCardField,
} from 'src/attachments/business-card-scan-rules';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.ContactCreateInput) {
    return this.databaseService.contact.create({ data });
  }

  async findAll(filter: 'all' | 'standalone' = 'standalone') {
    const where: Prisma.ContactWhereInput =
      filter === 'standalone' ? { leadId: null } : {};

    return this.databaseService.contact.findMany({
      where,
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        lead: { select: { id: true, business: true } },
        touchpoints: { orderBy: { date: 'desc' } },
        tasks: { where: { completed: false } },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    return this.databaseService.contact.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        lead: { select: { id: true, business: true } },
        touchpoints: { orderBy: { date: 'desc' } },
        tasks: true,
        changeSuggestions: { orderBy: { createdAt: 'asc' } },
      },
    });
  }

  async findByLead(leadId: string) {
    return this.databaseService.contact.findMany({
      where: { leadId },
      include: { changeSuggestions: { orderBy: { createdAt: 'asc' } } },
      orderBy: [{ isDecisionMaker: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async logTouchpoint(
    contactId: string,
    data: { type: TouchPointType; notes?: string; date?: string },
  ) {
    const touchpointDate = data.date ? new Date(data.date) : new Date();

    const touchpoint = await this.databaseService.touchPoint.create({
      data: {
        contactId,
        type: data.type,
        summary: data.notes,
        date: touchpointDate,
      },
    });

    await this.databaseService.contact.update({
      where: { id: contactId },
      data: { lastContactedAt: touchpointDate },
    });

    return touchpoint;
  }

  async update(id: string, data: Prisma.ContactUpdateInput) {
    return this.databaseService.contact.update({ where: { id }, data });
  }

  /**
   * A business card disagreed with a value on the contact (docs/business-card-scan.md).
   * Replace takes the business card's value; Keep leaves the contact as is. Either way
   * the suggestion is gone.
   */
  async resolveSuggestion(suggestionId: string, choice: 'replace' | 'keep') {
    const suggestion =
      await this.databaseService.contactChangeSuggestion.findUnique({
        where: { id: suggestionId },
      });
    if (!suggestion) throw new NotFoundException('Suggestion not found');
    if (!BUSINESS_CARD_FIELDS.includes(suggestion.field as BusinessCardField)) {
      throw new BadRequestException(`Unknown field ${suggestion.field}`);
    }

    return this.databaseService.$transaction(async (tx) => {
      if (choice === 'replace') {
        await tx.contact.update({
          where: { id: suggestion.contactId },
          data: { [suggestion.field]: suggestion.suggestedValue },
        });
      }
      await tx.contactChangeSuggestion.delete({ where: { id: suggestionId } });
      return tx.contact.findUnique({
        where: { id: suggestion.contactId },
        include: { changeSuggestions: { orderBy: { createdAt: 'asc' } } },
      });
    });
  }

  async remove(id: string) {
    return this.databaseService.contact.delete({ where: { id } });
  }
}
