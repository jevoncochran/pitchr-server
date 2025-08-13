import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createStaffDto: Prisma.StaffCreateInput) {
    return this.databaseService.staff.create({ data: createStaffDto });
  }

  findAll() {
    return this.databaseService.staff.findMany();
  }

  findOne(id: string) {
    return this.databaseService.staff.findUnique({ where: { id } });
  }

  update(id: string, updateStaffDto: Prisma.StaffUpdateInput) {
    return this.databaseService.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  remove(id: string) {
    return this.databaseService.staff.delete({ where: { id } });
  }
}
