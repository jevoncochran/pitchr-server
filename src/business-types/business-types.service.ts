import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BusinessTypesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBusinessTypeDto: Prisma.BusinessTypeCreateInput) {
    return this.databaseService.businessType.create({
      data: createBusinessTypeDto,
    });
  }

  async findAll() {
    return this.databaseService.businessType.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.businessType.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateBusinessTypeDto: Prisma.BusinessTypeUpdateInput,
  ) {
    return this.databaseService.businessType.update({
      where: { id },
      data: updateBusinessTypeDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.businessType.delete({ where: { id } });
  }
}
