// The visit debrief's quality measure (docs/visit-debrief.md): for each note
// that a visit was logged from, which fields of Claude's proposal the owner had
// to fix. Pure functions, so the comparison can be tested without a database;
// scripts/visit-debrief/report.ts reads the data and prints the report.

import { teamDateKey, TEAM_TIME_ZONE } from 'src/common/team-time';
import type { DebriefProposal } from './visit-debrief.service';

/** The fields compared, in the order they're reported. */
export const REPORT_FIELDS = [
  'outcome',
  'provider',
  'comeBack',
  'leftMaterials',
  'people',
  'summary',
] as const;
export type ReportField = (typeof REPORT_FIELDS)[number];

/** What was actually logged (the touchpoint the debrief is linked to). */
export interface LoggedVisit {
  outcome: string | null;
  providerType: string | null;
  comeBackAt: Date | null;
  leftMaterials: boolean;
  summary: string | null;
  /** The people logged as spoken to */
  contacts: { firstName: string; lastName: string | null }[];
}

export interface FieldCheck {
  field: ReportField;
  fixed: boolean;
  /** What was proposed and what was logged, when they differ */
  detail?: string;
}

/** Each field: did the owner keep the proposal, or fix it? */
export function compareDebrief(
  proposal: DebriefProposal,
  logged: LoggedVisit,
): FieldCheck[] {
  const checks: FieldCheck[] = [];
  const check = (
    field: ReportField,
    proposed: unknown,
    actual: unknown,
    same = proposed === actual,
  ) =>
    checks.push(
      same
        ? { field, fixed: false }
        : {
            field,
            fixed: true,
            detail: `${show(proposed)} → ${show(actual)}`,
          },
    );

  check('outcome', proposal.outcome, logged.outcome);
  // Provider only counts when the visit was logged as "has a provider"
  if (logged.outcome === 'HAS_PROVIDER') {
    check('provider', proposal.providerType, logged.providerType);
  }
  const proposedComeBack = proposal.comeBackDate
    ? `${proposal.comeBackDate}${proposal.comeBackTime ? ` ${proposal.comeBackTime}` : ''}`
    : null;
  const loggedComeBack = logged.comeBackAt
    ? comeBackKey(logged.comeBackAt, !!proposal.comeBackTime)
    : null;
  check('comeBack', proposedComeBack, loggedComeBack);
  check('leftMaterials', proposal.leftMaterials, logged.leftMaterials);

  const proposedPeople = new Set(
    proposal.people
      .filter((p) => p.spokeWith && (p.firstName || p.lastName))
      .map((p) => nameKey(p.firstName ?? p.lastName ?? '')),
  );
  const loggedPeople = new Set(
    logged.contacts.map((c) => nameKey(c.firstName)),
  );
  check(
    'people',
    [...proposedPeople].sort().join(', ') || null,
    [...loggedPeople].sort().join(', ') || null,
    sameSet(proposedPeople, loggedPeople),
  );

  const kept = similarity(proposal.summary, logged.summary ?? '');
  checks.push(
    kept >= 0.9
      ? { field: 'summary', fixed: false }
      : {
          field: 'summary',
          fixed: true,
          detail: `${Math.round(kept * 100)}% of the words kept`,
        },
  );
  return checks;
}

/**
 * "YYYY-MM-DD" in the team's time zone, with " HH:MM" when the proposal gave a
 * time (otherwise the form's default time doesn't count as a change).
 */
function comeBackKey(at: Date, withTime: boolean) {
  const day = teamDateKey(at);
  if (!withTime) return day;
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: TEAM_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(at);
  return `${day} ${time}`;
}

/** "María" and "maria" are the same person. */
function nameKey(name: string) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function sameSet(a: Set<string>, b: Set<string>) {
  return a.size === b.size && [...a].every((x) => b.has(x));
}

/** Share of the proposed summary's words still in the logged one (0 to 1). */
export function similarity(proposed: string, logged: string) {
  const words = (text: string) =>
    text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? [];
  const before = words(proposed);
  if (before.length === 0) return words(logged).length === 0 ? 1 : 0;
  const after = new Map<string, number>();
  for (const word of words(logged)) after.set(word, (after.get(word) ?? 0) + 1);
  let kept = 0;
  for (const word of before) {
    const left = after.get(word) ?? 0;
    if (left > 0) {
      kept++;
      after.set(word, left - 1);
    }
  }
  // Words added count against it too, so a summary rewritten at length isn't "kept"
  const added = [...after.values()].reduce((sum, n) => sum + n, 0);
  return kept / (before.length + added);
}

function show(value: unknown) {
  return value === null || value === undefined || value === ''
    ? '(none)'
    : String(value);
}
