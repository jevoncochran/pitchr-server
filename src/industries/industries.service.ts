import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IndustriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createIndustryDto: Prisma.IndustryCreateInput) {
    return this.databaseService.industry.create({ data: createIndustryDto });
  }

  async findAll() {
    const industries = await this.databaseService.industry.findMany();
    const industriesSimplified = [];
    for (const industry of industries) {
      industriesSimplified.push({ id: industry.id, name: industry.name });
    }
    return industriesSimplified;
  }

  async findOne(id: string) {
    return this.databaseService.industry.findUnique({ where: { id } });
  }

  async update(id: string, updateIndustryDto: Prisma.IndustryUpdateInput) {
    return this.databaseService.industry.update({
      where: { id },
      data: updateIndustryDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.industry.delete({ where: { id } });
  }
}
