import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class IndustriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createIndustryDto: Prisma.IndustryCreateInput) {
    return this.databaseService.industry.create({ data: createIndustryDto });
  }

  async findAll() {
    return this.databaseService.industry.findMany();
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
