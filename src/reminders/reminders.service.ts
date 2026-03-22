import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

// What to do when check-in at step N says "no response"
const SEQUENCE_MAP: Record<number, { type: string; note: string }> = {
  1: { type: 'EMAIL', note: 'Send email 2' },
  2: { type: 'EMAIL', note: 'Send email 3' },
  3: {
    type: 'IN_PERSON',
    note: 'Visit 2 — stop by in person, then send follow-up email same day',
  },
  4: { type: 'EMAIL', note: 'Send email 5' },
  5: { type: 'EMAIL', note: 'Send email 6' },
  6: {
    type: 'IN_PERSON',
    note: 'Visit 3 — last in-person push, then send follow-up email same day',
  },
  7: { type: 'EMAIL', note: 'Send email 8' },
  8: { type: 'EMAIL', note: 'Send email 9' },
};

@Injectable()
export class RemindersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReminderDto: Prisma.ReminderCreateInput) {
    return this.databaseService.reminder.create({ data: createReminderDto });
  }

  async findAll() {
    return this.databaseService.reminder.findMany({
      where: { completed: false },
      include: {
        lead: { select: { id: true, business: true, sequenceStep: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.databaseService.reminder.findUnique({ where: { id } });
  }

  async update(id: string, updateReminderDto: Prisma.ReminderUpdateInput) {
    return this.databaseService.reminder.update({
      where: { id },
      data: updateReminderDto,
    });
  }

  async complete(id: string) {
    return this.databaseService.reminder.update({
      where: { id },
      data: { completed: true, completedAt: new Date() },
    });
  }

  async respond(id: string, responded: boolean) {
    const reminder = await this.databaseService.reminder.findUnique({
      where: { id },
      include: { lead: true },
    });

    if (!reminder) throw new Error('Reminder not found');

    await this.databaseService.reminder.update({
      where: { id },
      data: { completed: true, completedAt: new Date() },
    });

    const lead = reminder.lead;
    const fourDays = new Date();
    fourDays.setDate(fourDays.getDate() + 4);
    const now = new Date();

    // ── "Did you send the follow-up email?" ──────────────────────────────────
    if (reminder.isEmailSentCheck) {
      if (responded) {
        // Email was sent — advance to step 1, queue 4-day "did they respond?" check-in
        await this.databaseService.lead.update({
          where: { id: lead.id },
          data: { sequenceStep: 1 },
        });
        await this.databaseService.reminder.create({
          data: {
            leadId: lead.id,
            type: 'EMAIL',
            dueDate: fourDays,
            note: 'Did they respond to your initial email?',
            isCheckIn: true,
          },
        });
      } else {
        // Not sent yet — create immediate action reminder to send it
        await this.databaseService.reminder.create({
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
    if (reminder.isResponseCheck) {
      if (responded) {
        // They replied again — reset to step 1, create another response check-in
        await this.databaseService.lead.update({
          where: { id: lead.id },
          data: { sequenceStep: 1 },
        });
        await this.databaseService.reminder.create({
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
        // No response to our reply — restart cycle: next action is Email 2
        await this.databaseService.lead.update({
          where: { id: lead.id },
          data: { sequenceStep: 1 },
        });
        await this.databaseService.reminder.create({
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
      // Lead responded — reset to step 1, wait 4 days to check if they replied to our reply
      await this.databaseService.lead.update({
        where: { id: lead.id },
        data: { sequenceStep: 1 },
      });
      await this.databaseService.reminder.create({
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
        await this.databaseService.lead.update({
          where: { id: lead.id },
          data: { pipelineStage: 'DORMANT', sequenceActive: false },
        });
      } else {
        const action = SEQUENCE_MAP[step];
        if (action) {
          await this.databaseService.reminder.create({
            data: {
              leadId: lead.id,
              type: action.type as any,
              dueDate: now,
              note: action.note,
            },
          });
        }
      }
    }

    return { success: true };
  }

  async remove(id: string) {
    return this.databaseService.reminder.delete({ where: { id } });
  }
}
