import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SequencePosition, TouchPointType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

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

const CHECK_IN_AFTER_DAYS = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Logs a touchpoint and applies the follow-up sequence rules in one database
 * transaction: either everything is saved, or nothing is.
 *
 * Rules (moved unchanged from the client's useLeadDetail hook):
 * - VISIT_ATTEMPT: no contact made, so nothing else happens.
 * - IN_PERSON: starts the lead's sequence (if it isn't running) and creates a
 *   "Did you send the follow-up email?" task, due now.
 * - EMAIL, while the sequence is running: completes any pending "did you send
 *   the email?" task, moves the lead to the next sequence step, and creates a
 *   "Did they respond?" check-in task due 4 days after the email.
 */
@Injectable()
export class TouchpointLoggingService {
  constructor(private readonly databaseService: DatabaseService) {}

  async logTouchpoint(input: LogTouchpointInput, userId: string) {
    if (!Object.values(TouchPointType).includes(input.type)) {
      throw new BadRequestException(`Unknown touchpoint type: ${input.type}`);
    }
    const date = new Date(input.date);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid touchpoint date');
    }

    return this.databaseService.$transaction(async (tx) => {
      const lead = await tx.lead.findUnique({ where: { id: input.leadId } });
      if (!lead) throw new NotFoundException('Lead not found');

      const touchpoint = await tx.touchPoint.create({
        data: {
          date,
          type: input.type,
          summary: input.summary ?? null,
          receivedResponse: input.receivedResponse ?? false,
          sequencePosition: input.sequencePosition ?? null,
          lead: { connect: { id: lead.id } },
          contactedBy: { connect: { id: userId } },
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

      if (input.type === TouchPointType.IN_PERSON) {
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
      } else if (input.type === TouchPointType.EMAIL && lead.sequenceActive) {
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
            dueDate: new Date(date.getTime() + CHECK_IN_AFTER_DAYS * DAY_MS),
            note: CHECK_IN_LABELS[newStep] ?? 'Did they respond?',
            isCheckIn: true,
            lead: { connect: { id: lead.id } },
            touchPoint: { connect: { id: touchpoint.id } },
          },
        });
      }
      // VISIT_ATTEMPT and every other type: just the touchpoint

      return touchpoint;
    });
  }
}
