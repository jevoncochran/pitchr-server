import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LeadsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLeadDto: Prisma.LeadCreateInput) {
    return this.databaseService.lead.create({ data: createLeadDto });
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
        reminders: {
          orderBy: { dueDate: 'asc' },
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

  async update(id: string, updateLeadDto: Prisma.LeadUpdateInput) {
    return this.databaseService.lead.update({
      where: { id },
      data: updateLeadDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.lead.delete({ where: { id } });
  }
}
