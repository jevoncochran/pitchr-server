import { Injectable } from '@nestjs/common';
import { Prisma, TouchPointType } from '@prisma/client';
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
      },
    });
  }

  async findByLead(leadId: string) {
    return this.databaseService.contact.findMany({
      where: { leadId },
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

  async remove(id: string) {
    return this.databaseService.contact.delete({ where: { id } });
  }
}
