import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TouchPointDelivery, TouchPointType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { changeStage } from 'src/leads/lead-stage';
import { ASYNC_TYPES } from 'src/touchpoints/touchpoint-logging.service';
import {
  NO_RESPONSE,
  parseReply,
  ReplyInput,
  saveResponse,
} from 'src/touchpoints/touchpoint-response';

// What to do when check-in at step N says "no response"
const SEQUENCE_MAP: Record<number, { type: string; note: string }> = {
  1: { type: 'EMAIL', note: 'Send outreach A2' },
  2: { type: 'EMAIL', note: 'Send outreach A3' },
  3: {
    type: 'IN_PERSON',
    note: 'Visit B — stop by in person, then send follow-up outreach same day',
  },
  4: { type: 'EMAIL', note: 'Send outreach B2' },
  5: { type: 'EMAIL', note: 'Send outreach B3' },
  6: {
    type: 'IN_PERSON',
    note: 'Visit C — last in-person push, then send follow-up outreach same day',
  },
  7: { type: 'EMAIL', note: 'Send outreach C2' },
  8: { type: 'EMAIL', note: 'Send outreach C3' },
};

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    return this.databaseService.task.create({ data: createTaskDto });
  }

  async findAll() {
    return this.databaseService.task.findMany({
      where: { completed: false },
      include: {
        lead: { select: { id: true, business: true, sequenceStep: true } },
        contact: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: [{ dueDate: 'asc' }],
    });
  }

  async findOne(id: string) {
    return this.databaseService.task.findUnique({ where: { id } });
  }

  async update(id: string, updateTaskDto: Prisma.TaskUpdateInput) {
    return this.databaseService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async complete(id: string) {
    return this.databaseService.task.update({
      where: { id },
      data: { completed: true, completedAt: new Date() },
    });
  }

  /**
   * Answers a task's yes/no question and moves the sequence along. For a
   * check-in about a DM, email or text, it also saves the response on that
   * message: their reply (text and date) when responded, or No response.
   * Everything is saved in one transaction.
   */
  async respond(id: string, responded: boolean, reply?: ReplyInput) {
    return this.databaseService.$transaction((tx) =>
      this.respondWithin(tx, id, responded, reply),
    );
  }

  /**
   * Records a reply to a DM, email or text at any time. If a check-in about
   * that message is still open, it's answered too, so it isn't asked again.
   */
  async recordReply(touchpointId: string, reply: ReplyInput) {
    const parsed = parseReply(reply);
    return this.databaseService.$transaction(async (tx) => {
      const openCheckIn = await tx.task.findFirst({
        where: {
          touchPointId: touchpointId,
          isCheckIn: true,
          isEmailSentCheck: false,
          completed: false,
        },
      });
      if (openCheckIn) {
        return this.respondWithin(tx, openCheckIn.id, true, reply);
      }
      await saveResponse(tx, touchpointId, parsed);
      return { success: true };
    });
  }

  private async respondWithin(
    tx: Prisma.TransactionClient,
    id: string,
    responded: boolean,
    reply?: ReplyInput,
  ) {
    const task = await tx.task.findUnique({
      where: { id },
      include: {
        lead: true,
        touchPoint: { select: { id: true, type: true, delivery: true } },
      },
    });

    if (!task) throw new NotFoundException('Task not found');
    if (!task.lead) {
      throw new BadRequestException('Task is not associated with a lead');
    }

    // A check-in about a message saves their reply (or No response) on that message
    const aboutMessage =
      task.isCheckIn &&
      !task.isEmailSentCheck &&
      task.touchPoint &&
      ASYNC_TYPES.includes(task.touchPoint.type) &&
      task.touchPoint.delivery !== TouchPointDelivery.FAILED;
    if (aboutMessage) {
      const parsed = responded ? parseReply(reply) : NO_RESPONSE;
      await saveResponse(tx, task.touchPoint!.id, parsed);
    }

    await tx.task.update({
      where: { id },
      data: { completed: true, completedAt: new Date() },
    });

    const lead = task.lead;
    const fourDays = new Date();
    fourDays.setDate(fourDays.getDate() + 4);
    const now = new Date();

    // ── "Did you send the follow-up email?" ──────────────────────────────────
    if (task.isEmailSentCheck) {
      if (responded) {
        // Email was sent — advance to step 1, queue 4-day "did they respond?" check-in
        await tx.lead.update({
          where: { id: lead.id },
          data: { sequenceStep: 1 },
        });
        await tx.task.create({
          data: {
            leadId: lead.id,
            type: 'EMAIL',
            dueDate: fourDays,
            note: 'Did they respond to your initial email?',
            isCheckIn: true,
          },
        });
      } else {
        // Not sent yet — create immediate action task to send it
        await tx.task.create({
          data: {
            leadId: lead.id,
            type: 'EMAIL',
            dueDate: now,
            note: 'Send follow-up email',
          },
        });
      }
      return { success: true };
    }

    // ── "Did they respond to your reply?" ────────────────────────────────────
    if (task.isResponseCheck) {
      if (responded) {
        // They replied again — reset to step 1, create another response check-in
        await tx.lead.update({
          where: { id: lead.id },
          data: { sequenceStep: 1 },
        });
        await tx.task.create({
          data: {
            leadId: lead.id,
            type: 'EMAIL',
            dueDate: fourDays,
            note: 'Did they respond to your reply?',
            isCheckIn: true,
            isResponseCheck: true,
          },
        });
      } else {
        // No response to our reply — restart cycle
        await tx.lead.update({
          where: { id: lead.id },
          data: { sequenceStep: 1 },
        });
        await tx.task.create({
          data: {
            leadId: lead.id,
            type: 'EMAIL',
            dueDate: now,
            note: 'Send email 2 — restarting follow-up cycle',
          },
        });
      }
      return { success: true };
    }

    // ── Regular sequence check-in ─────────────────────────────────────────────
    if (responded) {
      // Lead responded — reset to step 1, wait 4 days to check if they replied
      await tx.lead.update({
        where: { id: lead.id },
        data: { sequenceStep: 1 },
      });
      await tx.task.create({
        data: {
          leadId: lead.id,
          type: 'EMAIL',
          dueDate: fourDays,
          note: 'Did they respond to your reply?',
          isCheckIn: true,
          isResponseCheck: true,
        },
      });
    } else {
      const step = lead.sequenceStep;
      if (step >= 9) {
        // The sequence ran out with no response: the system moves the lead to Dormant
        const stageData = await changeStage(tx, lead, 'DORMANT', null);
        await tx.lead.update({
          where: { id: lead.id },
          data: { ...stageData, sequenceActive: false },
        });
      } else {
        const action = SEQUENCE_MAP[step];
        if (action) {
          await tx.task.create({
            data: {
              leadId: lead.id,
              type: action.type as TouchPointType,
              dueDate: now,
              note: action.note,
            },
          });
        }
      }
    }

    return { success: true };
  }

  async dismissOverdue() {
    const now = new Date();
    return this.databaseService.task.updateMany({
      where: { completed: false, dueDate: { lt: now } },
      data: { completed: true, completedAt: now },
    });
  }

  async clearAll() {
    return this.databaseService.task.deleteMany({
      where: { completed: false },
    });
  }

  async remove(id: string) {
    return this.databaseService.task.delete({ where: { id } });
  }
}
