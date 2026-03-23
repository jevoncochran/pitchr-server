import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ContactsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Prisma.ContactCreateInput) {
    return this.databaseService.contact.create({ data });
  }

  async findByLead(leadId: string) {
    return this.databaseService.contact.findMany({
      where: { leadId },
      orderBy: [{ isDecisionMaker: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async update(id: string, data: Prisma.ContactUpdateInput) {
    return this.databaseService.contact.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.databaseService.contact.delete({ where: { id } });
  }
}
