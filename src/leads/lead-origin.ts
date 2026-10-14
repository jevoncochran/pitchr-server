import { BadRequestException } from '@nestjs/common';
import { LeadOrigin } from '@prisma/client';

// How this lead started: see docs/lead-origin.md. Only ever set by hand,
// never worked out from touchpoints (they can be wrong or missing).

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
