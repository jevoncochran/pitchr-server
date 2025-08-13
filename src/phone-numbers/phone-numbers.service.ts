import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PhoneNumbersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPhoneNumberDto: Prisma.PhoneNumberCreateInput) {
    return this.databaseService.phoneNumber.create({
      data: createPhoneNumberDto,
    });
  }

  async findAll() {
    return this.databaseService.phoneNumber.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.phoneNumber.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updatePhoneNumberDto: Prisma.PhoneNumberUpdateInput,
  ) {
    return this.databaseService.phoneNumber.update({
      where: { id },
      data: updatePhoneNumberDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.phoneNumber.delete({ where: { id } });
  }
}
