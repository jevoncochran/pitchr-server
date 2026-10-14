import { BadRequestException } from '@nestjs/common';
import { LeadOrigin, Prisma, TouchPointType } from '@prisma/client';

// How this lead started: see docs/lead-origin.md.

export type OriginGroup = 'WE_REACHED_OUT' | 'THEY_CAME_TO_US';

export const ORIGIN_GROUP: Record<LeadOrigin, OriginGroup> = {
  IN_PERSON_VISIT: 'WE_REACHED_OUT',
  DM: 'WE_REACHED_OUT',
  EMAIL: 'WE_REACHED_OUT',
  TEXT: 'WE_REACHED_OUT',
  CALL: 'WE_REACHED_OUT',
  NETWORKING_EVENT: 'WE_REACHED_OUT',
  APPROACHED_US: 'THEY_CAME_TO_US',
  WEBSITE_FORM: 'THEY_CAME_TO_US',
  REFERRAL: 'THEY_CAME_TO_US',
  INSTAGRAM: 'THEY_CAME_TO_US',
  FACEBOOK: 'THEY_CAME_TO_US',
  TIKTOK: 'THEY_CAME_TO_US',
  YOUTUBE: 'THEY_CAME_TO_US',
  GOOGLE: 'THEY_CAME_TO_US',
  OTHER: 'THEY_CAME_TO_US',
};

/** The origin a lead's very first touchpoint implies. Meetings and "other" don't say. */
const ORIGIN_FROM_FIRST_TOUCHPOINT: Partial<
  Record<TouchPointType, LeadOrigin>
> = {
  IN_PERSON: LeadOrigin.IN_PERSON_VISIT,
  VISIT_ATTEMPT: LeadOrigin.IN_PERSON_VISIT,
  INSTAGRAM_DM: LeadOrigin.DM,
  EMAIL: LeadOrigin.EMAIL,
  TEXT: LeadOrigin.TEXT,
  CALL: LeadOrigin.CALL,
  NETWORKING: LeadOrigin.NETWORKING_EVENT,
  WALK_UP: LeadOrigin.APPROACHED_US,
  REFERRAL_OUTREACH: LeadOrigin.REFERRAL,
};

/**
 * Fills in a lead's origin from the touchpoint being logged, but only when the
 * lead has no origin and no touchpoints yet. A lead that already has
 * touchpoints is left alone: its first logged touchpoint may not be how it
 * really started. Call before saving the new touchpoint.
 */
export async function fillOriginOnFirstContact(
  tx: Prisma.TransactionClient,
  lead: { id: string; origin: LeadOrigin | null },
  type: TouchPointType,
) {
  const origin = ORIGIN_FROM_FIRST_TOUCHPOINT[type];
  if (lead.origin || !origin) return;

  const earlier = await tx.touchPoint.count({ where: { leadId: lead.id } });
  if (earlier > 0) return;

  await tx.lead.update({ where: { id: lead.id }, data: { origin } });
}

/** The origin fields to save from a create or update: the description only goes with Other. */
export function originFields(input: {
  origin?: unknown;
  originOther?: unknown;
}) {
  const origin = parseOrigin(input.origin);
  const originOther =
    origin === LeadOrigin.OTHER && typeof input.originOther === 'string'
      ? input.originOther.trim() || null
      : null;
  return { origin, originOther };
}

/** Checks an origin from the client; null or undefined means "not known". */
export function parseOrigin(origin: unknown): LeadOrigin | null {
  if (origin === undefined || origin === null || origin === '') return null;
  if (!Object.values(LeadOrigin).includes(origin as LeadOrigin)) {
    throw new BadRequestException(`Unknown origin: ${String(origin)}`);
  }
  return origin as LeadOrigin;
}
