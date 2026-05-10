import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
        contact: { select: { id: true, firstName: true, lastName: true } },
        contactedBy: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async outreachStats() {
    const [dmTotal, dmResponded, emailTotal, emailResponded] =
      await Promise.all([
        this.databaseService.touchPoint.count({
          where: { type: 'INSTAGRAM_DM' },
        }),
        this.databaseService.touchPoint.count({
          where: { type: 'INSTAGRAM_DM', receivedResponse: true },
        }),
        this.databaseService.touchPoint.count({
          where: { type: 'EMAIL' },
        }),
        this.databaseService.touchPoint.count({
          where: { type: 'EMAIL', receivedResponse: true },
        }),
      ]);

    return {
      dm: {
        sent: dmTotal,
        responded: dmResponded,
        rate: dmTotal > 0 ? Math.round((dmResponded / dmTotal) * 100) : 0,
      },
      email: {
        sent: emailTotal,
        responded: emailResponded,
        rate:
          emailTotal > 0
            ? Math.round((emailResponded / emailTotal) * 100)
            : 0,
      },
    };
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
      // Delete tasks directly linked to this touchpoint
      await this.databaseService.task.deleteMany({
        where: { touchPointId: id, completed: false },
      });

      // Also delete any incomplete sequence tasks created after this touchpoint
      // was logged — these are downstream effects (e.g. check-in answered "No" →
      // "Send email 2" action) that have no touchPointId but still belong to the chain.
      // Only applies to lead touchpoints (contactId-only touchpoints have no sequence).
      if (tp.leadId) {
        await this.databaseService.task.deleteMany({
          where: {
            leadId: tp.leadId,
            completed: false,
            createdAt: { gt: tp.createdAt },
          },
        });
      }
    }

    return this.databaseService.touchPoint.delete({ where: { id } });
  }
}
