import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  LeadSource,
  PipelineStage,
  Prisma,
  ProviderType,
  SessionChannel,
  SessionItemStatus,
  TouchPointDelivery,
  TouchPointOutcome,
  TouchPointResponse,
  TouchPointType,
} from '@prisma/client';
import { teamDateKey } from 'src/common/team-time';
import { DatabaseService } from 'src/database/database.service';
import { recordInitialStage } from 'src/leads/lead-stage';
import {
  parseResults,
  TouchpointLoggingService,
} from 'src/touchpoints/touchpoint-logging.service';
import { SessionsService, SessionUser } from './sessions.service';

/** What the session screen sends to log one lead. */
export interface LogSessionItemInput {
  // Exactly one of these says which lead:
  /** A planned item on the session's list */
  itemId?: string;
  /** An existing lead that wasn't planned */
  leadId?: string;
  /** A business added on the spot */
  newLead?: {
    business: string;
    industryId: string;
    businessTypeId: string;
    /** How we got the lead (defaults to OUTREACH). Not discoveredVia, which is how *they* heard about us. */
    source?: LeadSource | null;
  };

  /** Required in a mixed session; otherwise the session's channel decides */
  type?: TouchPointType;

  outcome?: TouchPointOutcome | null;
  delivery?: TouchPointDelivery | null;
  response?: TouchPointResponse | null;
  providerType?: ProviderType | null;
  comeBackAt?: string | null;
  /** "Come back later today": put the lead back on today's route at comeBackAt */
  addBackToRoute?: boolean;
  leftMaterials?: boolean;
  summary?: string | null;

  /** Contacts spoken to (must belong to the lead) */
  contactIds?: string[];
  /** A contact added on the spot */
  newContact?: {
    firstName: string;
    lastName?: string | null;
    title?: string | null;
    isDecisionMaker?: boolean;
  };
}

// The touchpoint type each channel logs by default
const CHANNEL_TYPE: Record<SessionChannel, TouchPointType | null> = {
  IN_PERSON: TouchPointType.IN_PERSON,
  CALL: TouchPointType.CALL,
  INSTAGRAM_DM: TouchPointType.INSTAGRAM_DM,
  EMAIL: TouchPointType.EMAIL,
  TEXT: TouchPointType.TEXT,
  MIXED: null,
};

// Results that should offer to move the lead to a new stage
const STAGE_SUGGESTIONS: Partial<Record<string, PipelineStage>> = {
  NOT_A_FIT: PipelineStage.NOT_A_FIT,
  MEETING_BOOKED: PipelineStage.MEETING_SCHEDULED,
};

/**
 * Logs one lead in a session: the touchpoint (with its sequence rules, via
 * TouchpointLoggingService), the session item, a quick-added lead or contact,
 * and "come back later", all in one transaction.
 */
@Injectable()
export class SessionLoggingService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly sessionsService: SessionsService,
    private readonly touchpointLoggingService: TouchpointLoggingService,
  ) {}

  async log(sessionId: string, input: LogSessionItemInput, user: SessionUser) {
    const session = await this.sessionsService.getEditable(sessionId, user);

    // ── Check everything before saving anything ──
    const leadSources = [input.itemId, input.leadId, input.newLead].filter(
      (source) => source !== undefined && source !== null,
    );
    if (leadSources.length !== 1) {
      throw new BadRequestException(
        'Send exactly one of itemId, leadId or newLead',
      );
    }
    const type = input.type ?? CHANNEL_TYPE[session.channel];
    if (!type) {
      throw new BadRequestException(
        'Pick a touchpoint type: this is a mixed session',
      );
    }
    if (input.newLead) validateNewLead(input.newLead);
    if (input.newContact && !input.newContact.firstName?.trim()) {
      throw new BadRequestException('A new contact needs a first name');
    }

    const now = new Date();
    const logInput = {
      leadId: '', // filled in once the lead is known
      date: now.toISOString(),
      type,
      summary: input.summary?.trim() || null,
      outcome: input.outcome,
      delivery: input.delivery,
      response: input.response,
      providerType: input.providerType,
      comeBackAt: input.comeBackAt,
      leftMaterials: input.leftMaterials,
      sessionId,
    };
    const parsed = parseResults(logInput);

    if (input.addBackToRoute) {
      const liveSession =
        session.channel === SessionChannel.IN_PERSON ||
        session.channel === SessionChannel.MIXED;
      if (
        !parsed.comeBackAt ||
        !liveSession ||
        teamDateKey(parsed.comeBackAt) !== teamDateKey(now)
      ) {
        throw new BadRequestException(
          'Only a "come back later" time later today can go back on the route',
        );
      }
    }

    // ── Save everything together ──
    const { touchpoint, leadId } = await this.databaseService.$transaction(
      async (tx) => {
        if (!session.startedAt) {
          await tx.outreachSession.update({
            where: { id: sessionId },
            data: { startedAt: now },
          });
        }

        // Which lead, and which item on the list
        let itemId: string;
        let leadId: string;
        if (input.itemId) {
          const item = await tx.sessionItem.findUnique({
            where: { id: input.itemId },
          });
          if (!item || item.sessionId !== sessionId) {
            throw new NotFoundException('Item not found in this session');
          }
          if (item.status === SessionItemStatus.COMPLETED) {
            throw new BadRequestException('This item is already logged');
          }
          itemId = item.id;
          leadId = item.leadId;
        } else {
          if (input.newLead) {
            const lead = await tx.lead.create({
              data: {
                business: input.newLead.business.trim(),
                industryId: input.newLead.industryId,
                businessTypeId: input.newLead.businessTypeId,
                source: input.newLead.source ?? LeadSource.OUTREACH,
              },
            });
            await recordInitialStage(tx, lead, user.id);
            leadId = lead.id;
          } else {
            const lead = await tx.lead.findUnique({
              where: { id: input.leadId },
              select: { id: true },
            });
            if (!lead) throw new NotFoundException('Lead not found');
            leadId = lead.id;
          }
          const item = await tx.sessionItem.create({
            data: {
              sessionId,
              leadId,
              position: await nextPosition(tx, sessionId),
            },
          });
          itemId = item.id;
        }

        // Who we spoke to
        const contactIds = [...(input.contactIds ?? [])];
        if (contactIds.length > 0) {
          const owned = await tx.contact.count({
            where: { id: { in: contactIds }, leadId },
          });
          if (owned !== new Set(contactIds).size) {
            throw new BadRequestException(
              "One or more contacts don't belong to this lead",
            );
          }
        }
        if (input.newContact) {
          const contact = await tx.contact.create({
            data: {
              firstName: input.newContact.firstName.trim(),
              lastName: input.newContact.lastName?.trim() || null,
              title: input.newContact.title?.trim() || null,
              isDecisionMaker: input.newContact.isDecisionMaker ?? false,
              leadId,
              userId: user.id,
            },
          });
          contactIds.push(contact.id);
        }

        // The touchpoint, with the same sequence rules as the lead page
        const touchpoint = await this.touchpointLoggingService.logWithin(
          tx,
          { ...logInput, leadId, contactIds },
          user.id,
          parsed,
        );

        await tx.sessionItem.update({
          where: { id: itemId },
          data: {
            status: SessionItemStatus.COMPLETED,
            touchPointId: touchpoint.id,
          },
        });

        // Come back later: a follow-up task at the time they named
        if (parsed.comeBackAt) {
          await tx.task.create({
            data: {
              type:
                parsed.type === TouchPointType.VISIT_ATTEMPT
                  ? TouchPointType.IN_PERSON
                  : parsed.type,
              dueDate: parsed.comeBackAt,
              note: logInput.summary
                ? `Come back later: ${logInput.summary}`
                : 'Come back later',
              lead: { connect: { id: leadId } },
              touchPoint: { connect: { id: touchpoint.id } },
            },
          });
          if (input.addBackToRoute) {
            await tx.sessionItem.create({
              data: {
                sessionId,
                leadId,
                position: await nextPosition(tx, sessionId),
                plannedTime: parsed.comeBackAt,
              },
            });
          }
        }

        return { touchpoint, leadId };
      },
    );

    // Offer a stage change the client can apply (through the normal stage rules)
    const result = parsed.outcome ?? parsed.response;
    const suggestion = result ? STAGE_SUGGESTIONS[result] : undefined;
    let suggestedStage: PipelineStage | null = null;
    if (suggestion) {
      const lead = await this.databaseService.lead.findUnique({
        where: { id: leadId },
        select: { pipelineStage: true },
      });
      if (lead && lead.pipelineStage !== suggestion)
        suggestedStage = suggestion;
    }

    return {
      touchpointId: touchpoint.id,
      suggestedStage,
      session: await this.sessionsService.findOne(sessionId, user),
    };
  }
}

function validateNewLead(newLead: NonNullable<LogSessionItemInput['newLead']>) {
  if (!newLead.business?.trim()) {
    throw new BadRequestException('A new lead needs a business name');
  }
  if (!newLead.industryId || !newLead.businessTypeId) {
    throw new BadRequestException(
      'A new lead needs an industry and a business type',
    );
  }
  if (newLead.source && !Object.values(LeadSource).includes(newLead.source)) {
    throw new BadRequestException(`Unknown source: ${newLead.source}`);
  }
}

async function nextPosition(tx: Prisma.TransactionClient, sessionId: string) {
  const last = await tx.sessionItem.findFirst({
    where: { sessionId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  return (last?.position ?? -1) + 1;
}
