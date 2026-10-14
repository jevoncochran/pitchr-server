import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { teamDateKey } from 'src/common/team-time';

// Where pitchr-ai runs. On Railway this is its private network address.
const PITCHR_AI_URL = process.env.PITCHR_AI_URL ?? 'http://localhost:8000';

// Shared secret pitchr-ai requires on every request. Same value as
// PITCHR_AI_API_KEY in pitchr-ai.
const PITCHR_AI_API_KEY = process.env.PITCHR_AI_API_KEY;

// Snapshots take a few seconds; give up if pitchr-ai hasn't answered in 60.
const TIMEOUT_MS = 60_000;

// pitchr-ai only looks at the 25 most recent touchpoints.
const MAX_TOUCHPOINTS = 25;

// Everything the snapshot needs from the database, and nothing more.
// Contact details (phones, emails) and ownership flags are deliberately left out.
const SNAPSHOT_INCLUDE = {
  industry: { select: { name: true } },
  businessType: { select: { name: true } },
  referredByLead: { select: { business: true } },
  contacts: true,
  touchPoint: {
    orderBy: { date: 'desc' },
    take: MAX_TOUCHPOINTS,
    include: { contacts: { select: { firstName: true, lastName: true } } },
  },
  signals: true,
  notes: true,
  tasks: { where: { completed: false } },
} satisfies Prisma.LeadInclude;

type LeadWithSnapshotData = Prisma.LeadGetPayload<{
  include: typeof SNAPSHOT_INCLUDE;
}>;

/** What pitchr-ai sends back. Mirrors LeadSnapshotResponse in pitchr-ai. */
export interface LeadSnapshot {
  lastContact: { date: string; daysAgo: number; type: string } | null;
  lastActivity: { date: string; daysAgo: number; description: string } | null;
  effort: Record<string, number>;
  analysis: {
    headline: string;
    decisionMaker: string;
    keyFacts: string[];
    odds: 'high' | 'medium' | 'low' | 'unknown';
    oddsReason: string;
    goal: string;
    suggestedApproach: string;
  };
}

@Injectable()
export class LeadSnapshotService {
  private readonly logger = new Logger(LeadSnapshotService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async getSnapshot(leadId: string): Promise<LeadSnapshot> {
    const lead = await this.databaseService.lead.findUnique({
      where: { id: leadId },
      include: SNAPSHOT_INCLUDE,
    });
    if (!lead) throw new NotFoundException('Lead not found');

    if (!PITCHR_AI_API_KEY) {
      this.logger.error('PITCHR_AI_API_KEY is not set');
      throw new ServiceUnavailableException(
        'The snapshot service is unavailable. Try again later.',
      );
    }

    let response: Response;
    try {
      response = await fetch(`${PITCHR_AI_URL}/leads/snapshot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Api-Key': PITCHR_AI_API_KEY,
        },
        body: JSON.stringify(this.buildRequest(lead)),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch (error) {
      // pitchr-ai is down, unreachable, or took too long
      this.logger.error(`pitchr-ai request failed: ${error}`);
      throw new ServiceUnavailableException(
        'The snapshot service is unavailable. Try again later.',
      );
    }

    if (!response.ok) {
      // 502: Claude failed. 422: we sent data that doesn't match the contract.
      // 401: our PITCHR_AI_API_KEY doesn't match pitchr-ai's.
      this.logger.error(
        `pitchr-ai returned ${response.status}: ${await response.text()}`,
      );
      throw new BadGatewayException(
        "Couldn't generate the snapshot. Try again.",
      );
    }

    return (await response.json()) as LeadSnapshot;
  }

  /** Reshape the lead into the request pitchr-ai expects (LeadSnapshotRequest). */
  private buildRequest(lead: LeadWithSnapshotData) {
    return {
      today: teamDateKey(),
      lead: {
        business: lead.business,
        industry: lead.industry?.name ?? null,
        businessType: lead.businessType?.name ?? null,
        pipelineStage: lead.pipelineStage,
        sequenceStep: lead.sequenceStep,
        isHot: lead.isHot,
        priority: lead.priority,
        source: lead.source,
        discoveredVia: lead.discoveredViaOther ?? lead.discoveredVia,
        referredBy: lead.referredByLead?.business ?? lead.referredByName,
        dormantReason: lead.dormantReason,
        dormantRevisitAt: lead.dormantRevisitAt,
      },
      contacts: lead.contacts.map((contact) => ({
        firstName: contact.firstName,
        lastName: contact.lastName,
        title: contact.title,
        isDecisionMaker: contact.isDecisionMaker,
        howWeMet:
          [contact.howWeMet, contact.howWeMetNote].filter(Boolean).join(': ') ||
          null,
        bio: contact.bio,
      })),
      touchpoints: lead.touchPoint.map((tp) => ({
        date: tp.date,
        type: tp.type,
        receivedResponse: tp.receivedResponse,
        // DMs, emails, texts: pending / replied / no response, and their reply
        response: tp.response,
        responseText: tp.responseText,
        respondedOn: tp.respondedOn?.toISOString().slice(0, 10) ?? null,
        contactNames: tp.contacts.map((c) =>
          [c.firstName, c.lastName].filter(Boolean).join(' '),
        ),
        summary: tp.summary,
      })),
      signals: lead.signals.map((signal) => ({
        date: signal.date,
        type: signal.type,
        platform: signal.platform,
        note: signal.note,
      })),
      notes: lead.notes.map((note) => ({
        date: note.createdAt,
        text: note.text,
      })),
      openTasks: lead.tasks.map((task) => ({
        dueDate: task.dueDate,
        type: task.type,
        note: task.note,
      })),
    };
  }
}
