import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  PipelineStage,
  Prisma,
  TouchPointDelivery,
  TouchPointResponse,
} from '@prisma/client';
import { teamDateKey } from 'src/common/team-time';
import { ASYNC_TYPES } from './touchpoint-logging.service';

/** What the client sends when someone replied to a DM, email or text. */
export interface ReplyInput {
  /** Their reply, pasted or typed in */
  responseText: string;
  /** YYYY-MM-DD; defaults to today */
  respondedOn?: string | null;
}

/** Session outcomes that should offer to move the lead to a new stage. */
export const STAGE_SUGGESTIONS: Partial<Record<string, PipelineStage>> = {
  NOT_A_FIT: PipelineStage.NOT_A_FIT,
  MEETING_BOOKED: PipelineStage.MEETING_SCHEDULED,
};

export interface ParsedResponse {
  response: TouchPointResponse;
  responseText: string | null;
  respondedOn: Date | null;
}

/** Checks a reply from the client: their message is required, the date defaults to today. */
export function parseReply(input: ReplyInput | undefined): ParsedResponse {
  const responseText = input?.responseText?.trim();
  if (!responseText) {
    throw new BadRequestException('Add their reply (paste or type it in)');
  }

  const today = teamDateKey();
  const day = input?.respondedOn ?? today;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    throw new BadRequestException('respondedOn must be a date (YYYY-MM-DD)');
  }
  if (day > today) {
    throw new BadRequestException("respondedOn can't be in the future");
  }

  return {
    response: TouchPointResponse.REPLIED,
    responseText,
    respondedOn: new Date(`${day}T00:00:00Z`),
  };
}

export const NO_RESPONSE: ParsedResponse = {
  response: TouchPointResponse.NO_RESPONSE,
  responseText: null,
  respondedOn: null,
};

/**
 * Saves a response on a DM, email or text touchpoint. Rejects live types
 * (visits, calls record an outcome instead) and messages that weren't delivered.
 */
export async function saveResponse(
  tx: Prisma.TransactionClient,
  touchpointId: string,
  parsed: ParsedResponse,
) {
  const touchpoint = await tx.touchPoint.findUnique({
    where: { id: touchpointId },
    select: { id: true, type: true, delivery: true },
  });
  if (!touchpoint) throw new NotFoundException('Touchpoint not found');
  if (!ASYNC_TYPES.includes(touchpoint.type)) {
    throw new BadRequestException(
      'Only DMs, emails and texts have responses; visits and calls record an outcome',
    );
  }
  if (touchpoint.delivery === TouchPointDelivery.FAILED) {
    throw new BadRequestException(
      "This message wasn't delivered, so it can't have a response",
    );
  }

  await tx.touchPoint.update({
    where: { id: touchpointId },
    data: {
      response: parsed.response,
      responseText: parsed.responseText,
      respondedOn: parsed.respondedOn,
      receivedResponse: parsed.response === TouchPointResponse.REPLIED,
    },
  });
}
