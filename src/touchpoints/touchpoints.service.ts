import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TouchpointsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTouchpointDto: Prisma.TouchPointCreateInput) {
    return this.databaseService.touchPoint.create({
      data: createTouchpointDto,
    });
  }

  async findAll() {
    return this.databaseService.touchPoint.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.touchPoint.findUnique({ where: { id } });
  }

  async update(id: string, updateTouchpointDto: Prisma.TouchPointUpdateInput) {
    return this.databaseService.touchPoint.update({
      where: { id },
      data: updateTouchpointDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.touchPoint.delete({ where: { id } });
  }
}
