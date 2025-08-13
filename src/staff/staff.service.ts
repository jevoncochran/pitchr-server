import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStaffDto: Prisma.StaffCreateInput) {
    return this.databaseService.staff.create({ data: createStaffDto });
  }

  async findAll() {
    return this.databaseService.staff.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.staff.findUnique({ where: { id } });
  }

  async update(id: string, updateStaffDto: Prisma.StaffUpdateInput) {
    return this.databaseService.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.staff.delete({ where: { id } });
  }
}
