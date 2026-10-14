import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PipelineStage, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { changeStage, parseConvertedAt } from './lead-stage';

@Injectable()
export class LeadsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLeadDto: Prisma.LeadCreateInput, userId: string) {
    const { convertedAt, ...data } = createLeadDto;
    const requestedConvertedAt = parseConvertedAt(convertedAt ?? undefined);

    return this.databaseService.$transaction(async (tx) => {
      const lead = await tx.lead.create({
        data: {
          ...data,
          ...(data.pipelineStage === PipelineStage.CONVERTED && {
            convertedAt: requestedConvertedAt ?? new Date(),
          }),
        },
      });
      // The lead's first stage starts its stage history
      await tx.leadStageChange.create({
        data: {
          leadId: lead.id,
          fromStage: null,
          toStage: lead.pipelineStage,
          changedById: userId,
        },
      });
      return lead;
    });
  }

  async findAll() {
    return this.databaseService.lead.findMany({
      include: {
        industry: true,
        businessType: true,
        touchPoint: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true },
        },
        referredByLead: {
          select: { id: true, business: true },
        },
      },
    });
  }

  async findNewUncoctactedLeads() {
    const newUncoctactedLeads = [];
    const allLeads = await this.databaseService.lead.findMany();

    for (const lead of allLeads) {
      const touchpoints = await this.databaseService.touchPoint.findMany({
        where: { leadId: lead.id },
      });

      if (touchpoints.length === 0) {
        newUncoctactedLeads.push(lead);
      }
    }

    return newUncoctactedLeads;
  }

  async findPostVisitLeads() {
    const allLeads = await this.databaseService.lead.findMany();
    const postVisitLeads = [];

    for (const lead of allLeads) {
      // Get all touchpoints for this lead, most recent first
      const touchpoints = await this.databaseService.touchPoint.findMany({
        where: { leadId: lead.id },
        orderBy: { date: 'desc' },
      });

      if (touchpoints.length > 0) {
        const mostRecent = touchpoints[0];

        // If most recent touchpoint was in person, add to list
        if (mostRecent.type === 'IN_PERSON') {
          postVisitLeads.push(lead);
        }
      }
    }

    return postVisitLeads;
  }

  async findEstrangedLeads() {
    const allLeads = await this.databaseService.lead.findMany();
    const estrangedLeads = [];

    for (const lead of allLeads) {
      const touchpoints = await this.databaseService.touchPoint.findMany({
        where: { leadId: lead.id },
        orderBy: { date: 'desc' },
        take: 1, // only need the most recent
      });

      // If 7 days or more have passed since most recent touchpoint, add to the list
      if (touchpoints.length > 0) {
        const mostRecent = touchpoints[0];
        const now = new Date();
        const diffInDays =
          (now.getTime() - new Date(mostRecent.date).getTime()) /
          (1000 * 60 * 60 * 24);

        if (diffInDays >= 7) {
          estrangedLeads.push(lead);
        }
      }
    }

    return estrangedLeads;
  }

  async findOne(id: string) {
    return this.databaseService.lead.findUnique({
      where: { id },
      include: {
        industry: true,
        businessType: true,
        locations: {
          include: { phoneNumbers: true },
        },
        touchPoint: {
          orderBy: { date: 'desc' },
          include: {
            contactedBy: {
              select: { id: true, firstName: true, lastName: true },
            },
            contacts: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
              },
            },
          },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        tasks: {
          orderBy: { dueDate: 'asc' },
        },
        signals: {
          orderBy: { date: 'desc' },
        },
        contacts: {
          orderBy: [{ isDecisionMaker: 'desc' }, { createdAt: 'asc' }],
        },
        assignedTo: {
          select: { id: true, firstName: true, lastName: true },
        },
        referredByLead: {
          select: { id: true, business: true },
        },
      },
    });
  }

  /**
   * Updates a lead. A stage change (pipelineStage) goes through changeStage, so
   * it's recorded in the stage history and the conversion date stays correct.
   * convertedAt on its own can only be edited (e.g. backdated) on a Converted lead.
   */
  async update(
    id: string,
    updateLeadDto: Prisma.LeadUpdateInput,
    userId: string,
  ) {
    const { pipelineStage, convertedAt, ...rest } = updateLeadDto;
    if (pipelineStage !== undefined && typeof pipelineStage !== 'string') {
      throw new BadRequestException('pipelineStage must be a stage name');
    }
    if (convertedAt === null) {
      throw new BadRequestException(
        'To remove a conversion, move the lead out of Converted',
      );
    }
    const requestedConvertedAt = parseConvertedAt(convertedAt);

    return this.databaseService.$transaction(async (tx) => {
      const lead = await tx.lead.findUnique({
        where: { id },
        select: { id: true, pipelineStage: true },
      });
      if (!lead) throw new NotFoundException('Lead not found');

      const data: Prisma.LeadUpdateInput = { ...rest };
      if (pipelineStage && pipelineStage !== lead.pipelineStage) {
        Object.assign(
          data,
          await changeStage(
            tx,
            lead,
            pipelineStage,
            userId,
            requestedConvertedAt,
          ),
        );
      } else if (requestedConvertedAt) {
        if (lead.pipelineStage !== PipelineStage.CONVERTED) {
          throw new BadRequestException(
            'Only converted leads have a conversion date',
          );
        }
        data.convertedAt = requestedConvertedAt;
      }

      return tx.lead.update({ where: { id }, data });
    });
  }

  async remove(id: string) {
    return this.databaseService.lead.delete({ where: { id } });
  }
}
