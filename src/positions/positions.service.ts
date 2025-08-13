import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PositionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createPositionDto: Prisma.PositionCreateInput) {
    return this.databaseService.position.create({ data: createPositionDto });
  }

  findAll() {
    return this.databaseService.position.findMany();
  }

  findOne(id: string) {
    return this.databaseService.position.findUnique({ where: { id } });
  }

  update(id: string, updatePositionDto: Prisma.PositionUpdateInput) {
    return this.databaseService.position.update({
      where: { id },
      data: updatePositionDto,
    });
  }

  remove(id: string) {
    return this.databaseService.position.delete({ where: { id } });
  }
}
