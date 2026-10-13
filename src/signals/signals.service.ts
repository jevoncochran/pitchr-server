import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SignalsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSignalDto: Prisma.SignalCreateInput) {
    return this.databaseService.signal.create({ data: createSignalDto });
  }

  async update(id: string, updateSignalDto: Prisma.SignalUpdateInput) {
    return this.databaseService.signal.update({
      where: { id },
      data: updateSignalDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.signal.delete({ where: { id } });
  }
}
