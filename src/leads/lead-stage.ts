import { BadRequestException } from '@nestjs/common';
import { PipelineStage, Prisma } from '@prisma/client';

/**
 * The one place a lead's pipeline stage changes. Every stage change (the lead
 * page, the pipeline board, the sequence ending in Dormant) goes through here,
 * so the rules always apply:
 *
 * - Every change is recorded in LeadStageChange (who, from, to, when).
 * - Moving to Converted sets convertedAt (today, or a date the user picks:
 *   conversions can be backdated to when the money actually came in).
 * - Moving out of Converted clears convertedAt, so the lead no longer counts as
 *   a conversion. The history still shows it was converted.
 *
 * Call it inside a transaction, so the stage change and its history row are
 * saved together. It returns the fields to write to the lead.
 */
export async function changeStage(
  tx: Prisma.TransactionClient,
  lead: { id: string; pipelineStage: PipelineStage },
  toStage: PipelineStage,
  changedById: string | null,
  convertedAt?: Date,
): Promise<Pick<Prisma.LeadUpdateInput, 'pipelineStage' | 'convertedAt'>> {
  if (!Object.values(PipelineStage).includes(toStage)) {
    throw new BadRequestException(`Unknown pipeline stage: ${toStage}`);
  }
  if (toStage === lead.pipelineStage) return {};

  await tx.leadStageChange.create({
    data: {
      leadId: lead.id,
      fromStage: lead.pipelineStage,
      toStage,
      changedById,
    },
  });

  if (toStage === PipelineStage.CONVERTED) {
    return { pipelineStage: toStage, convertedAt: convertedAt ?? new Date() };
  }
  if (lead.pipelineStage === PipelineStage.CONVERTED) {
    return { pipelineStage: toStage, convertedAt: null };
  }
  return { pipelineStage: toStage };
}

/** Starts a new lead's stage history with the stage it was created in. */
export async function recordInitialStage(
  tx: Prisma.TransactionClient,
  lead: { id: string; pipelineStage: PipelineStage },
  changedById: string | null,
) {
  await tx.leadStageChange.create({
    data: {
      leadId: lead.id,
      fromStage: null,
      toStage: lead.pipelineStage,
      changedById,
    },
  });
}

/** Turns a conversion date sent by the client into a Date, or rejects it. */
export function parseConvertedAt(value: unknown): Date | undefined {
  if (value === undefined) return undefined;
  const date = typeof value === 'string' ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) {
    throw new BadRequestException('Invalid conversion date');
  }
  if (date.getTime() > Date.now()) {
    throw new BadRequestException("A conversion date can't be in the future");
  }
  return date;
}
