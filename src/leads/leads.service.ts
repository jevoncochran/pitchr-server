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
    const leads = await this.databaseService.lead.findMany();

    const expandedLeads = [];
    for (const lead of leads) {
      const industry = await this.databaseService.industry.findUnique({
        where: { id: lead.industryId },
      });

      const businessType = await this.databaseService.businessType.findUnique({
        where: { id: lead.businessTypeId },
      });

      const expandedLead = {
        ...lead,
        industry: industry?.name,
        businessType: businessType?.name,
      };

      expandedLeads.push(expandedLead);
    }

    return expandedLeads;
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
