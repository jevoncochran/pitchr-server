import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BusinessStaffService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBusinessStaffDto: Prisma.BusinessStaffCreateInput) {
    return this.databaseService.businessStaff.create({
      data: createBusinessStaffDto,
    });
  }

  async findAll() {
    return this.databaseService.businessStaff.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.businessStaff.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateBusinessStaffDto: Prisma.BusinessStaffUpdateInput,
  ) {
    return this.databaseService.businessStaff.update({
      where: { id },
      data: updateBusinessStaffDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.businessStaff.delete({ where: { id } });
  }
}
