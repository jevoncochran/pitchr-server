import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  LeadOrigin,
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
import { sameValue } from 'src/attachments/business-card-scan-rules';
import { teamDateKey } from 'src/common/team-time';
import { DatabaseService } from 'src/database/database.service';
import { originFields, parseOrigin } from 'src/leads/lead-origin';
import { recordInitialStage } from 'src/leads/lead-stage';
import {
  parseResults,
  TouchpointLoggingService,
} from 'src/touchpoints/touchpoint-logging.service';
import { STAGE_SUGGESTIONS } from 'src/touchpoints/touchpoint-response';
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
    /** Optional: can be filled in later on the lead page */
    industryId?: string | null;
    businessTypeId?: string | null;
    /** How this lead started (docs/lead-origin.md); empty if not known */
    origin?: LeadOrigin | null;
    /** Only with origin OTHER */
    originOther?: string | null;
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
  newContact?: NewSessionContact;
  /**
   * Contacts added on the spot (e.g. from a visit debrief). `spokeWith: false`
   * adds them without counting them as spoken to (the owner who wasn't in).
   */
  newContacts?: (NewSessionContact & { spokeWith?: boolean })[];
  /**
   * What a visit debrief learned about contacts on file (docs/visit-debrief.md):
   * an empty title is filled in, a different one becomes a Replace/Keep
   * suggestion, and isDecisionMaker is only ever turned on.
   */
  contactUpdates?: {
    contactId: string;
    title?: string | null;
    isDecisionMaker?: boolean;
  }[];
  /** The visit debrief this was filled in from, linked to the touchpoint */
  debriefId?: string | null;
}

interface NewSessionContact {
  firstName: string;
  lastName?: string | null;
  title?: string | null;
  isDecisionMaker?: boolean;
}

// A session logged before it was started: its photos are the lead's from the
// last 12 hours
const HALF_DAY_MS = 12 * 60 * 60 * 1000;

// The touchpoint type each channel logs by default
const CHANNEL_TYPE: Record<SessionChannel, TouchPointType | null> = {
  IN_PERSON: TouchPointType.IN_PERSON,
  CALL: TouchPointType.CALL,
  INSTAGRAM_DM: TouchPointType.INSTAGRAM_DM,
  EMAIL: TouchPointType.EMAIL,
  TEXT: TouchPointType.TEXT,
  MIXED: null,
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
    const newContacts = [
      ...(input.newContact ? [{ ...input.newContact, spokeWith: true }] : []),
      ...(input.newContacts ?? []),
    ];
    if (newContacts.some((contact) => !contact.firstName?.trim())) {
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
          'Only a come-back time later today can go back on the route',
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
                industryId: input.newLead.industryId || null,
                businessTypeId: input.newLead.businessTypeId || null,
                ...originFields(input.newLead),
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
        const updates = input.contactUpdates ?? [];
        const onFile = new Set([
          ...contactIds,
          ...updates.map((update) => update.contactId),
        ]);
        if (onFile.size > 0) {
          const owned = await tx.contact.count({
            where: { id: { in: [...onFile] }, leadId },
          });
          if (owned !== onFile.size) {
            throw new BadRequestException(
              "One or more contacts don't belong to this lead",
            );
          }
        }
        for (const newContact of newContacts) {
          const contact = await tx.contact.create({
            data: {
              firstName: newContact.firstName.trim(),
              lastName: newContact.lastName?.trim() || null,
              title: newContact.title?.trim() || null,
              isDecisionMaker: newContact.isDecisionMaker ?? false,
              leadId,
              userId: user.id,
            },
          });
          if (newContact.spokeWith !== false) contactIds.push(contact.id);
        }
        await applyContactUpdates(tx, updates);

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

        // The visit debrief this was filled in from (docs/visit-debrief.md)
        if (input.debriefId) {
          const { count } = await tx.visitDebrief.updateMany({
            where: {
              id: input.debriefId,
              sessionId,
              leadId,
              touchPointId: null,
            },
            data: { touchPointId: touchpoint.id },
          });
          if (count !== 1) {
            throw new BadRequestException("That debrief isn't for this visit");
          }
        }

        // A visit's photos (business cards, the storefront) go with its
        // touchpoint: the lead's photos from this session not on one yet
        if (parsed.type === TouchPointType.IN_PERSON) {
          await tx.attachment.updateMany({
            where: {
              leadId,
              touchpointId: null,
              createdAt: {
                gte: session.startedAt ?? new Date(now.getTime() - HALF_DAY_MS),
              },
            },
            data: { touchpointId: touchpoint.id },
          });
        }

        // Going back (come back later, interested, decision-maker not
        // available): a follow-up task at the time they named
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
    const suggestion = parsed.outcome
      ? STAGE_SUGGESTIONS[parsed.outcome]
      : undefined;
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

/**
 * What a visit debrief learned about contacts on file, with business card
 * scan's rule: fill in an empty title, suggest a different one (Replace /
 * Keep), and only ever turn isDecisionMaker on.
 */
async function applyContactUpdates(
  tx: Prisma.TransactionClient,
  updates: NonNullable<LogSessionItemInput['contactUpdates']>,
) {
  for (const update of updates) {
    const contact = await tx.contact.findUniqueOrThrow({
      where: { id: update.contactId },
      select: { title: true, isDecisionMaker: true },
    });
    const data: Prisma.ContactUpdateInput = {};
    const title = update.title?.trim();
    const current = contact.title?.trim();
    if (title && !current) data.title = title;
    else if (title && current && !sameValue('title', current, title)) {
      await tx.contactChangeSuggestion.upsert({
        where: {
          contactId_field: { contactId: update.contactId, field: 'title' },
        },
        create: {
          contactId: update.contactId,
          field: 'title',
          currentValue: current,
          suggestedValue: title,
        },
        update: { currentValue: current, suggestedValue: title },
      });
    }
    if (update.isDecisionMaker && !contact.isDecisionMaker) {
      data.isDecisionMaker = true;
    }
    if (Object.keys(data).length > 0) {
      await tx.contact.update({ where: { id: update.contactId }, data });
    }
  }
}

function validateNewLead(newLead: NonNullable<LogSessionItemInput['newLead']>) {
  if (!newLead.business?.trim()) {
    throw new BadRequestException('A new lead needs a business name');
  }
  parseOrigin(newLead.origin);
}

async function nextPosition(tx: Prisma.TransactionClient, sessionId: string) {
  const last = await tx.sessionItem.findFirst({
    where: { sessionId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  return (last?.position ?? -1) + 1;
}
