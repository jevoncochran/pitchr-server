import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LeadsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLeadDto: Prisma.LeadCreateInput) {
    return this.databaseService.lead.create({ data: createLeadDto });
  }

  async findAll() {
    return this.databaseService.lead.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.lead.findUnique({ where: { id } });
  }

  async update(id: string, updateLeadDto: Prisma.LeadUpdateInput) {
    return this.databaseService.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.lead.delete({ where: { id } });
  }
}
