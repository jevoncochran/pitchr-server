import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PhoneNumbersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createPhoneNumberDto: Prisma.PhoneNumberCreateInput) {
    return this.databaseService.phoneNumber.create({
      data: createPhoneNumberDto,
    });
  }

  findAll() {
    return this.databaseService.phoneNumber.findMany();
  }

  findOne(id: string) {
    return this.databaseService.phoneNumber.findUnique({ where: { id } });
  }

  update(id: string, updatePhoneNumberDto: Prisma.PhoneNumberUpdateInput) {
    return this.databaseService.phoneNumber.update({
      where: { id },
      data: updatePhoneNumberDto,
    });
  }

  remove(id: string) {
    return this.databaseService.phoneNumber.delete({ where: { id } });
  }
}
