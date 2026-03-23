import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
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
    return this.databaseService.touchPoint.findMany({
      orderBy: { date: 'desc' },
      include: {
        lead: { select: { id: true, business: true } },
        contactedBy: { select: { id: true, firstName: true, lastName: true } },
      },
    });
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
    const tp = await this.databaseService.touchPoint.findUnique({
      where: { id },
    });

    if (tp) {
      // Delete reminders directly linked to this touchpoint
      await this.databaseService.reminder.deleteMany({
        where: { touchPointId: id, completed: false },
      });

      // Also delete any incomplete sequence reminders created after this touchpoint
      // was logged — these are downstream effects (e.g. check-in answered "No" →
      // "Send email 2" action) that have no touchPointId but still belong to the chain
      await this.databaseService.reminder.deleteMany({
        where: {
          leadId: tp.leadId,
          completed: false,
          createdAt: { gt: tp.createdAt },
        },
      });
    }

    return this.databaseService.touchPoint.delete({ where: { id } });
  }
}
