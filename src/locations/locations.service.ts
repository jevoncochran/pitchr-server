import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LocationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocationDto: Prisma.LocationCreateInput) {
    return this.databaseService.location.create({ data: createLocationDto });
  }

  async findAll() {
    return this.databaseService.location.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.location.findUnique({ where: { id } });
  }

  async update(id: string, updateLocationDto: Prisma.LocationUpdateInput) {
    return this.databaseService.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.location.delete({ where: { id } });
  }
}
