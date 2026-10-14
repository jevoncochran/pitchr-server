import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  SessionChannel,
  SessionItemStatus,
  TouchPointDelivery,
  TouchPointOutcome,
} from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

/** The logged-in user, as the JWT strategy provides it. */
export interface SessionUser {
  id: string;
  role: string;
}

export interface CreateSessionInput {
  channel: SessionChannel;
  /** YYYY-MM-DD */
  plannedFor?: string | null;
  area?: string | null;
  goal?: number | null;
  notes?: string | null;
  /** Leads to plan, in order */
  leadIds?: string[];
}

export type UpdateSessionInput = Partial<Omit<CreateSessionInput, 'leadIds'>>;

// What a session's items include: enough about each lead to show it, navigate to it and log it
const ITEM_INCLUDE = {
  lead: {
    select: {
      id: true,
      business: true,
      pipelineStage: true,
      industry: { select: { name: true } },
      primaryLocation: {
        select: { addressLine1: true, city: true, state: true, zip: true },
      },
      // For "who did you talk to?" on the session screen
      contacts: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          title: true,
          isDecisionMaker: true,
        },
        orderBy: [{ isDecisionMaker: 'desc' }, { firstName: 'asc' }],
      },
    },
  },
  touchPoint: {
    select: {
      id: true,
      type: true,
      outcome: true,
      delivery: true,
      response: true,
    },
  },
} satisfies Prisma.SessionItemInclude;

// Outcomes where nobody was spoken to
const NO_CONVERSATION: TouchPointOutcome[] = [
  TouchPointOutcome.BUSINESS_CLOSED,
  TouchPointOutcome.NO_ANSWER,
  TouchPointOutcome.LEFT_VOICEMAIL,
];

@Injectable()
export class SessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // ── Sessions ──────────────────────────────────────────────────────────────

  async create(input: CreateSessionInput, user: SessionUser) {
    const leadIds = input.leadIds ?? [];
    await this.assertLeadsExist(leadIds);
    assertNoDuplicates(leadIds);

    const session = await this.databaseService.outreachSession.create({
      data: {
        userId: user.id,
        ...parseDetails(input, true),
        items: {
          create: leadIds.map((leadId, position) => ({ leadId, position })),
        },
      },
    });
    return this.findOne(session.id, user);
  }

  /** Your sessions; admins can ask for everyone's with all = true. */
  async findAll(user: SessionUser, all = false) {
    const sessions = await this.databaseService.outreachSession.findMany({
      where: all && isAdmin(user) ? {} : { userId: user.id },
      orderBy: [{ plannedFor: 'desc' }, { createdAt: 'desc' }],
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        items: { select: { status: true } },
      },
    });

    // Replace the item list with counts: the list page only needs totals
    return sessions.map(({ items, ...session }) => ({
      ...session,
      itemCounts: countItems(items),
    }));
  }

  /** The session and its list, plus its summary once it has ended. */
  async findOne(id: string, user: SessionUser) {
    await this.getAccessible(id, user);
    const session = await this.databaseService.outreachSession.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        items: { orderBy: { position: 'asc' }, include: ITEM_INCLUDE },
      },
    });
    if (!session?.startedAt || !session.endedAt) return session;
    return {
      ...session,
      summary: await this.summarize(
        id,
        session.startedAt,
        session.endedAt,
        session.items,
      ),
    };
  }

  async update(id: string, input: UpdateSessionInput, user: SessionUser) {
    const session = await this.getAccessible(id, user);
    if (input.channel && session.startedAt) {
      throw new BadRequestException(
        "A session's channel can't change once it has started",
      );
    }
    await this.databaseService.outreachSession.update({
      where: { id },
      data: parseDetails(input, false),
    });
    return this.findOne(id, user);
  }

  async remove(id: string, user: SessionUser) {
    await this.getAccessible(id, user);
    // Items are deleted with the session; touchpoints stay on the leads
    await this.databaseService.outreachSession.delete({ where: { id } });
    return { success: true };
  }

  async start(id: string, user: SessionUser) {
    const session = await this.getAccessible(id, user);
    if (session.endedAt) {
      throw new BadRequestException('This session has already ended');
    }
    if (!session.startedAt) {
      await this.databaseService.outreachSession.update({
        where: { id },
        data: { startedAt: new Date() },
      });
    }
    return this.findOne(id, user);
  }

  /** Ends the session and returns its summary. */
  async end(id: string, user: SessionUser) {
    const session = await this.getAccessible(id, user);
    if (!session.startedAt) {
      throw new BadRequestException("This session hasn't started");
    }
    const endedAt = session.endedAt ?? new Date();
    if (!session.endedAt) {
      await this.databaseService.outreachSession.update({
        where: { id },
        data: { endedAt },
      });
    }

    const items = await this.databaseService.sessionItem.findMany({
      where: { sessionId: id },
      select: { status: true },
    });
    return this.summarize(id, session.startedAt, endedAt, items);
  }

  /**
   * What a session got done, from the touchpoints logged in it: how many
   * items were worked, the conversations and their outcomes, decision-makers
   * reached, meetings booked, messages sent, and the follow-ups it created.
   */
  private async summarize(
    sessionId: string,
    startedAt: Date,
    endedAt: Date,
    items: { status: SessionItemStatus }[],
  ) {
    const touchpoints = await this.databaseService.touchPoint.findMany({
      where: { sessionId },
      select: {
        leadId: true,
        outcome: true,
        delivery: true,
        contacts: { select: { isDecisionMaker: true } },
        tasks: {
          select: {
            id: true,
            type: true,
            note: true,
            dueDate: true,
            completed: true,
            lead: { select: { id: true, business: true } },
          },
        },
      },
    });

    const outcomes: Partial<Record<TouchPointOutcome, number>> = {};
    for (const { outcome } of touchpoints) {
      if (outcome) outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    }
    const withOutcome = touchpoints.filter((t) => t.outcome);
    const withDelivery = touchpoints.filter((t) => t.delivery);
    // Counted per lead: talking to the owner twice in one session is one reached
    const decisionMakerLeads = new Set(
      touchpoints
        .filter((t) => t.contacts.some((c) => c.isDecisionMaker))
        .map((t) => t.leadId),
    );

    return {
      sessionId,
      startedAt,
      endedAt,
      durationMinutes: Math.round(
        (endedAt.getTime() - startedAt.getTime()) / 60_000,
      ),
      itemCounts: countItems(items),
      conversations: withOutcome.filter(
        (t) => !NO_CONVERSATION.includes(t.outcome!),
      ).length,
      decisionMakersReached: decisionMakerLeads.size,
      meetingsBooked: outcomes.MEETING_BOOKED ?? 0,
      outcomes,
      messages: {
        sent: withDelivery.filter((t) => t.delivery === TouchPointDelivery.SENT)
          .length,
        failed: withDelivery.filter(
          (t) => t.delivery === TouchPointDelivery.FAILED,
        ).length,
      },
      // Soonest first; tasks without a due date last
      followUps: touchpoints
        .flatMap((t) => t.tasks)
        .sort(
          (a, b) =>
            (a.dueDate?.getTime() ?? Infinity) -
            (b.dueDate?.getTime() ?? Infinity),
        ),
    };
  }

  // ── Items ─────────────────────────────────────────────────────────────────

  /** Adds leads to the end of the session's list. */
  async addItems(id: string, leadIds: string[], user: SessionUser) {
    await this.getEditable(id, user);
    if (!Array.isArray(leadIds) || leadIds.length === 0) {
      throw new BadRequestException('leadIds must be a non-empty list');
    }
    assertNoDuplicates(leadIds);
    await this.assertLeadsExist(leadIds);

    const existing = await this.databaseService.sessionItem.findMany({
      where: { sessionId: id },
      select: { leadId: true, position: true, status: true },
    });
    const alreadyPlanned = existing.filter(
      (item) =>
        item.status === SessionItemStatus.PLANNED &&
        leadIds.includes(item.leadId),
    );
    if (alreadyPlanned.length > 0) {
      throw new BadRequestException(
        'One or more of these leads is already planned in this session',
      );
    }

    const nextPosition =
      existing.reduce((max, item) => Math.max(max, item.position), -1) + 1;
    await this.databaseService.sessionItem.createMany({
      data: leadIds.map((leadId, i) => ({
        sessionId: id,
        leadId,
        position: nextPosition + i,
      })),
    });
    return this.findOne(id, user);
  }

  /** Saves a new order. itemIds must list every item in the session exactly once. */
  async reorderItems(id: string, itemIds: string[], user: SessionUser) {
    await this.getEditable(id, user);
    const items = await this.databaseService.sessionItem.findMany({
      where: { sessionId: id },
      select: { id: true },
    });
    const current = new Set(items.map((item) => item.id));
    if (
      !Array.isArray(itemIds) ||
      itemIds.length !== current.size ||
      new Set(itemIds).size !== itemIds.length ||
      !itemIds.every((itemId) => current.has(itemId))
    ) {
      throw new BadRequestException(
        "itemIds must list every item in this session's list exactly once",
      );
    }

    await this.databaseService.$transaction(
      itemIds.map((itemId, position) =>
        this.databaseService.sessionItem.update({
          where: { id: itemId },
          data: { position },
        }),
      ),
    );
    return this.findOne(id, user);
  }

  /** Skip an item, or put a skipped one back on the plan. */
  async setItemStatus(
    id: string,
    itemId: string,
    status: SessionItemStatus,
    user: SessionUser,
  ) {
    await this.getEditable(id, user);
    if (
      status !== SessionItemStatus.SKIPPED &&
      status !== SessionItemStatus.PLANNED
    ) {
      throw new BadRequestException(
        'Items can only be skipped or planned here; logging a touchpoint completes them',
      );
    }
    const item = await this.getItem(id, itemId);
    if (item.status === SessionItemStatus.COMPLETED) {
      throw new BadRequestException('This item is already completed');
    }
    await this.databaseService.sessionItem.update({
      where: { id: itemId },
      data: { status },
    });
    return this.findOne(id, user);
  }

  async removeItem(id: string, itemId: string, user: SessionUser) {
    await this.getEditable(id, user);
    const item = await this.getItem(id, itemId);
    if (item.status === SessionItemStatus.COMPLETED) {
      throw new BadRequestException(
        "A completed item can't be removed: it's linked to a touchpoint",
      );
    }
    await this.databaseService.sessionItem.delete({ where: { id: itemId } });
    return this.findOne(id, user);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** The session, if this user may see it: their own, or any for admins. */
  private async getAccessible(id: string, user: SessionUser) {
    const session = await this.databaseService.outreachSession.findUnique({
      where: { id },
    });
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== user.id && !isAdmin(user)) {
      throw new ForbiddenException("This is another person's session");
    }
    return session;
  }

  /** Like getAccessible, but the session's list must still be changeable. */
  async getEditable(id: string, user: SessionUser) {
    const session = await this.getAccessible(id, user);
    if (session.endedAt) {
      throw new BadRequestException(
        "This session has ended; its list can't change",
      );
    }
    return session;
  }

  private async getItem(sessionId: string, itemId: string) {
    const item = await this.databaseService.sessionItem.findUnique({
      where: { id: itemId },
    });
    if (!item || item.sessionId !== sessionId) {
      throw new NotFoundException('Item not found in this session');
    }
    return item;
  }

  private async assertLeadsExist(leadIds: string[]) {
    if (leadIds.length === 0) return;
    const found = await this.databaseService.lead.count({
      where: { id: { in: leadIds } },
    });
    if (found !== new Set(leadIds).size) {
      throw new BadRequestException('One or more leads were not found');
    }
  }
}

function isAdmin(user: SessionUser) {
  return user.role === 'ADMIN';
}

function assertNoDuplicates(leadIds: string[]) {
  if (new Set(leadIds).size !== leadIds.length) {
    throw new BadRequestException('A lead can only be planned once');
  }
}

function countItems(items: { status: SessionItemStatus }[]) {
  return {
    total: items.length,
    planned: items.filter((i) => i.status === SessionItemStatus.PLANNED).length,
    completed: items.filter((i) => i.status === SessionItemStatus.COMPLETED)
      .length,
    skipped: items.filter((i) => i.status === SessionItemStatus.SKIPPED).length,
  };
}

/** Validates session details from the client and turns them into database fields. */
function parseDetails(
  input: UpdateSessionInput,
  requireChannel: true,
): Omit<Prisma.OutreachSessionUncheckedCreateInput, 'userId'>;
function parseDetails(
  input: UpdateSessionInput,
  requireChannel: false,
): Prisma.OutreachSessionUpdateInput;
function parseDetails(input: UpdateSessionInput, requireChannel: boolean) {
  const data: Record<string, unknown> = {};

  if (input.channel !== undefined || requireChannel) {
    if (
      !Object.values(SessionChannel).includes(input.channel as SessionChannel)
    ) {
      throw new BadRequestException(`Unknown channel: ${input.channel}`);
    }
    data.channel = input.channel;
  }
  if (input.plannedFor !== undefined) {
    if (input.plannedFor === null) {
      data.plannedFor = null;
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(input.plannedFor)) {
      data.plannedFor = new Date(`${input.plannedFor}T00:00:00Z`);
    } else {
      throw new BadRequestException('plannedFor must be a date (YYYY-MM-DD)');
    }
  }
  if (input.goal !== undefined) {
    if (
      input.goal !== null &&
      (!Number.isInteger(input.goal) || input.goal < 1)
    ) {
      throw new BadRequestException('goal must be a whole number above 0');
    }
    data.goal = input.goal;
  }
  for (const field of ['area', 'notes'] as const) {
    if (input[field] !== undefined) {
      data[field] = input[field]?.trim() || null;
    }
  }
  return data;
}
