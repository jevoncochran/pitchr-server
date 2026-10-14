// The team works in Tampa, so "today" means today there, not in UTC
// (the server runs in UTC on Railway).
export const TEAM_TIME_ZONE = 'America/New_York';

/** A date as YYYY-MM-DD in the team's time zone. */
export function teamDateKey(date: Date = new Date()): string {
  // The en-CA locale formats dates as YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: TEAM_TIME_ZONE }).format(
    date,
  );
}
