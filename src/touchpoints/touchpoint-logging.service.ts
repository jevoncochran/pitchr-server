import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  ProviderType,
  SequencePosition,
  TouchPointDelivery,
  TouchPointOutcome,
  TouchPointResponse,
  TouchPointType,
} from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { fillOriginOnFirstContact } from 'src/leads/lead-origin';

/** What the client sends to log a touchpoint for a lead. */
export interface LogTouchpointInput {
  leadId: string;
  date: string;
  type: TouchPointType;
  summary?: string | null;
  receivedResponse?: boolean;
  sequencePosition?: SequencePosition | null;
  contactIds?: string[];
  /** Set when the touchpoint is logged from a task ("Log completion"); that task is completed. */
  completingTaskId?: string | null;

  // Results (see "Results" in docs/outreach-sessions.md)
  /** In person / calls: what happened */
  outcome?: TouchPointOutcome | null;
  /** DMs / emails / texts: whether it got through (defaults to SENT) */
  delivery?: TouchPointDelivery | null;
  /** DMs / emails / texts: where the reply stands (defaults to PENDING, or REPLIED if receivedResponse) */
  response?: TouchPointResponse | null;
  /** DMs / emails / texts: their reply, when response is REPLIED */
  responseText?: string | null;
  /** When the outcome is HAS_PROVIDER (defaults to UNKNOWN) */
  providerType?: ProviderType | null;
  /** When the outcome is COME_BACK_LATER and they named a time */
  comeBackAt?: string | null;
  leftMaterials?: boolean;
  sessionId?: string | null;
}

// The check-in task's wording for each sequence step
export const CHECK_IN_LABELS: Record<number, string> = {
  1: 'Did they respond to outreach A1?',
  2: 'Did they respond to outreach A2?',
  3: 'Did they respond to outreach A3?',
  4: 'Did they respond to outreach B1?',
  5: 'Did they respond to outreach B2?',
  6: 'Did they respond to outreach B3?',
  7: 'Did they respond to outreach C1?',
  8: 'Did they respond to outreach C2?',
  9: 'Did they respond to outreach C3?',
};

/** Messages: delivery at the time, response later. Everything else records an outcome. */
export const ASYNC_TYPES: TouchPointType[] = [
  TouchPointType.EMAIL,
  TouchPointType.INSTAGRAM_DM,
  TouchPointType.TEXT,
];

// Outcomes only some live types can have
const OUTCOME_TYPES: Partial<Record<TouchPointOutcome, TouchPointType[]>> = {
  BUSINESS_CLOSED: [TouchPointType.IN_PERSON, TouchPointType.VISIT_ATTEMPT],
  NO_ANSWER: [TouchPointType.CALL],
  LEFT_VOICEMAIL: [TouchPointType.CALL],
};

// Results that mean we got a reply or talked to someone (for receivedResponse)
const NO_CONVERSATION_OUTCOMES: TouchPointOutcome[] = [
  TouchPointOutcome.BUSINESS_CLOSED,
  TouchPointOutcome.NO_ANSWER,
  TouchPointOutcome.LEFT_VOICEMAIL,
];

const CHECK_IN_AFTER_DAYS = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Logs a touchpoint and applies the follow-up sequence rules in one database
 * transaction: either everything is saved, or nothing is.
 *
 * Sequence rules (moved unchanged from the client's useLeadDetail hook):
 * - VISIT_ATTEMPT: no contact made, so nothing else happens. An in-person
 *   visit with the outcome BUSINESS_CLOSED is saved as a VISIT_ATTEMPT.
 * - IN_PERSON: starts the lead's sequence (if it isn't running) and creates a
 *   "Did you send the follow-up email?" task, due now.
 * - EMAIL, while the sequence is running: completes any pending "did you send
 *   the email?" task, moves the lead to the next sequence step, and creates a
 *   "Did they respond?" check-in task due 4 days after the email. An email
 *   that FAILED to deliver does none of this: there's nothing to follow up on.
 */
@Injectable()
export class TouchpointLoggingService {
  constructor(private readonly databaseService: DatabaseService) {}

  /** Logs a touchpoint in its own transaction. */
  async logTouchpoint(input: LogTouchpointInput, userId: string) {
    const data = parseResults(input);
    return this.databaseService.$transaction((tx) =>
      this.logWithin(tx, input, userId, data),
    );
  }

  /**
   * Logs a touchpoint inside a transaction someone else started, so callers
   * (like session logging) can save more alongside it, all or nothing.
   */
  async logWithin(
    tx: Prisma.TransactionClient,
    input: LogTouchpointInput,
    userId: string,
    parsed = parseResults(input),
  ) {
    const lead = await tx.lead.findUnique({ where: { id: input.leadId } });
    if (!lead) throw new NotFoundException('Lead not found');

    // A lead's very first contact says how it started, if nobody has said yet
    await fillOriginOnFirstContact(tx, lead, parsed.type);

    const touchpoint = await tx.touchPoint.create({
      data: {
        date: parsed.date,
        type: parsed.type,
        summary: input.summary ?? null,
        receivedResponse: parsed.receivedResponse,
        sequencePosition: input.sequencePosition ?? null,
        outcome: parsed.outcome,
        delivery: parsed.delivery,
        response: parsed.response,
        responseText: parsed.responseText,
        providerType: parsed.providerType,
        respondedOn: parsed.respondedOn,
        comeBackAt: parsed.comeBackAt,
        leftMaterials: input.leftMaterials ?? false,
        lead: { connect: { id: lead.id } },
        contactedBy: { connect: { id: userId } },
        ...(input.sessionId && {
          session: { connect: { id: input.sessionId } },
        }),
        ...(input.contactIds?.length && {
          contacts: { connect: input.contactIds.map((id) => ({ id })) },
        }),
      },
    });

    if (input.completingTaskId) {
      await tx.task.update({
        where: { id: input.completingTaskId },
        data: { completed: true, completedAt: new Date() },
      });
    }

    if (parsed.type === TouchPointType.IN_PERSON) {
      if (!lead.sequenceActive) {
        await tx.lead.update({
          where: { id: lead.id },
          data: { sequenceActive: true },
        });
      }
      await tx.task.create({
        data: {
          type: TouchPointType.EMAIL,
          dueDate: new Date(),
          note: 'Did you send the follow-up email?',
          isEmailSentCheck: true,
          lead: { connect: { id: lead.id } },
          touchPoint: { connect: { id: touchpoint.id } },
        },
      });
    } else if (
      parsed.type === TouchPointType.EMAIL &&
      parsed.delivery !== TouchPointDelivery.FAILED &&
      lead.sequenceActive
    ) {
      const pendingEmailCheck = await tx.task.findFirst({
        where: { leadId: lead.id, isEmailSentCheck: true, completed: false },
      });
      if (pendingEmailCheck) {
        await tx.task.update({
          where: { id: pendingEmailCheck.id },
          data: { completed: true, completedAt: new Date() },
        });
      }

      const newStep = lead.sequenceStep + 1;
      await tx.lead.update({
        where: { id: lead.id },
        data: { sequenceStep: newStep },
      });
      await tx.task.create({
        data: {
          type: TouchPointType.EMAIL,
          dueDate: new Date(
            parsed.date.getTime() + CHECK_IN_AFTER_DAYS * DAY_MS,
          ),
          note: CHECK_IN_LABELS[newStep] ?? 'Did they respond?',
          isCheckIn: true,
          lead: { connect: { id: lead.id } },
          touchPoint: { connect: { id: touchpoint.id } },
        },
      });
    }
    // VISIT_ATTEMPT and every other type: just the touchpoint

    return touchpoint;
  }
}

/**
 * Checks the type, date and results against each other and fills in the
 * defaults. Throws before anything is saved if they don't fit together.
 */
export function parseResults(input: LogTouchpointInput) {
  if (!Object.values(TouchPointType).includes(input.type)) {
    throw new BadRequestException(`Unknown touchpoint type: ${input.type}`);
  }
  const date = new Date(input.date);
  if (Number.isNaN(date.getTime())) {
    throw new BadRequestException('Invalid touchpoint date');
  }
  const outcome = input.outcome ?? null;
  const response = input.response ?? null;
  const isAsync = ASYNC_TYPES.includes(input.type);

  if (outcome && !Object.values(TouchPointOutcome).includes(outcome)) {
    throw new BadRequestException(`Unknown outcome: ${outcome}`);
  }
  if (response && !Object.values(TouchPointResponse).includes(response)) {
    throw new BadRequestException(`Unknown response: ${response}`);
  }
  if (
    input.delivery &&
    !Object.values(TouchPointDelivery).includes(input.delivery)
  ) {
    throw new BadRequestException(`Unknown delivery: ${input.delivery}`);
  }
  if (isAsync && outcome) {
    throw new BadRequestException(
      'Messages record delivery and a response, not an outcome',
    );
  }
  if (!isAsync && (input.delivery || response)) {
    throw new BadRequestException(
      'Visits and calls record an outcome, not delivery or a response',
    );
  }
  if (
    outcome &&
    OUTCOME_TYPES[outcome] &&
    !OUTCOME_TYPES[outcome].includes(input.type)
  ) {
    throw new BadRequestException(
      `${outcome} doesn't apply to a ${input.type} touchpoint`,
    );
  }

  // An in-person visit to a closed business reached no one: same as a visit attempt
  const type =
    input.type === TouchPointType.IN_PERSON &&
    outcome === TouchPointOutcome.BUSINESS_CLOSED
      ? TouchPointType.VISIT_ATTEMPT
      : input.type;

  // Messages: sent unless we know otherwise; waiting for a reply unless we already know
  const delivery = isAsync ? (input.delivery ?? TouchPointDelivery.SENT) : null;
  const failed = delivery === TouchPointDelivery.FAILED;
  if (failed && response) {
    throw new BadRequestException(
      "A message that wasn't delivered can't have a response",
    );
  }
  const finalResponse =
    isAsync && !failed
      ? (response ??
        (input.receivedResponse
          ? TouchPointResponse.REPLIED
          : TouchPointResponse.PENDING))
      : null;
  const replied = finalResponse === TouchPointResponse.REPLIED;
  const responseText = input.responseText?.trim() || null;
  if (responseText && !replied) {
    throw new BadRequestException('responseText only goes with a reply');
  }

  // Provider type and "come back later" timing belong to visit and call outcomes
  const hasProvider = outcome === TouchPointOutcome.HAS_PROVIDER;
  const comeBackLater = outcome === TouchPointOutcome.COME_BACK_LATER;
  if (input.providerType && !hasProvider) {
    throw new BadRequestException(
      'providerType only applies to "has a provider"',
    );
  }
  if (input.comeBackAt && !comeBackLater) {
    throw new BadRequestException(
      'comeBackAt only applies to "come back later"',
    );
  }
  let comeBackAt: Date | null = null;
  if (input.comeBackAt) {
    comeBackAt = new Date(input.comeBackAt);
    if (Number.isNaN(comeBackAt.getTime())) {
      throw new BadRequestException('Invalid comeBackAt');
    }
  }

  // receivedResponse follows the results when they're given, so existing
  // screens and stats ("responded") stay correct
  let receivedResponse = input.receivedResponse ?? false;
  if (outcome) receivedResponse = !NO_CONVERSATION_OUTCOMES.includes(outcome);
  if (finalResponse) receivedResponse = replied;

  return {
    date,
    type,
    outcome,
    delivery,
    response: finalResponse,
    responseText,
    providerType: hasProvider
      ? (input.providerType ?? ProviderType.UNKNOWN)
      : null,
    // A reply recorded while logging happened today (date only)
    respondedOn: replied ? new Date() : null,
    comeBackAt,
    receivedResponse,
  };
}
