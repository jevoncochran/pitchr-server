/**
 * The visit debrief's quality report (docs/visit-debrief.md): for every note a
 * visit was logged from, which fields of Claude's proposal had to be fixed.
 * Reads only; nothing is changed, so it's safe on prod.
 *
 * Usage (from pitchr-server):
 *   npx ts-node -r tsconfig-paths/register scripts/visit-debrief/report.ts --db dev
 *   npx ts-node -r tsconfig-paths/register scripts/visit-debrief/report.ts --db prod --since 2026-11-01 --worst 10
 *
 * --since YYYY-MM-DD only counts notes from that day on (e.g. after a prompt
 * or model change); --worst N lists the N notes with the most fixes (default 5).
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import {
  compareDebrief,
  REPORT_FIELDS,
  ReportField,
} from '../../src/sessions/visit-debrief-report';
import type { DebriefProposal } from '../../src/sessions/visit-debrief.service';

dotenv.config();

const FIELD_LABEL: Record<ReportField, string> = {
  outcome: 'Outcome',
  provider: 'Provider (has a provider only)',
  comeBack: 'Come back day/time',
  leftMaterials: 'Left materials',
  people: 'Who we spoke with',
  summary: 'Summary (under 90% kept)',
};

async function main() {
  const args = process.argv.slice(2);
  const option = (name: string) => {
    const at = args.indexOf(name);
    return at >= 0 ? args[at + 1] : undefined;
  };
  const db = option('--db');
  if (db !== 'prod' && db !== 'dev') {
    throw new Error('Say which database: --db prod or --db dev');
  }
  const since = option('--since');
  const worst = Number(option('--worst') ?? 5);
  const url =
    db === 'prod' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;
  if (!url) throw new Error(`No database URL for ${db}`);

  const prisma = new PrismaClient({ datasources: { db: { url } } });
  console.log(
    `Visit debrief quality on ${db} (${new URL(url).hostname})` +
      (since ? `, since ${since}` : ''),
  );

  try {
    const debriefs = await prisma.visitDebrief.findMany({
      where: since ? { createdAt: { gte: new Date(`${since}T00:00:00`) } } : {},
      include: {
        lead: { select: { business: true } },
        touchPoint: {
          select: {
            outcome: true,
            providerType: true,
            comeBackAt: true,
            leftMaterials: true,
            summary: true,
            contacts: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const logged = debriefs.filter((d) => d.touchPoint);
    const models = new Map<string, number>();
    for (const d of debriefs)
      models.set(d.model, (models.get(d.model) ?? 0) + 1);
    console.log(
      `\n${debriefs.length} notes filled in, ${logged.length} logged ` +
        `(${debriefs.length - logged.length} filled in again or not logged)`,
    );
    console.log(
      `Models: ${[...models].map(([m, n]) => `${m} ${n}`).join(', ') || '(none)'}`,
    );
    if (logged.length === 0) {
      console.log(
        '\nNothing to compare yet: no visit has been logged from a note.',
      );
      return;
    }

    const results = logged.map((d) => ({
      debrief: d,
      checks: compareDebrief(
        d.proposal as unknown as DebriefProposal,
        d.touchPoint!,
      ),
    }));

    console.log('\nFixed by hand, per field:');
    for (const field of REPORT_FIELDS) {
      const compared = results.flatMap((r) =>
        r.checks.filter((c) => c.field === field),
      );
      if (compared.length === 0) continue;
      const fixed = compared.filter((c) => c.fixed).length;
      console.log(
        `  ${FIELD_LABEL[field].padEnd(32)} ${String(fixed).padStart(3)} of ${String(compared.length).padEnd(3)} ` +
          `(${Math.round((fixed / compared.length) * 100)}%)`,
      );
    }

    const fixesPer = results.map((r) => r.checks.filter((c) => c.fixed).length);
    const untouched = fixesPer.filter((n) => n === 0).length;
    const average = fixesPer.reduce((a, b) => a + b, 0) / results.length;
    console.log(
      `\nFields fixed per note: ${average.toFixed(1)} on average; ` +
        `${untouched} of ${results.length} logged exactly as proposed.`,
    );

    const ranked = results
      .map((r, i) => ({ ...r, fixes: fixesPer[i] }))
      .filter((r) => r.fixes > 0)
      .sort((a, b) => b.fixes - a.fixes)
      .slice(0, worst);
    if (ranked.length > 0) {
      console.log(`\nMost fixes (up to ${worst}):`);
      for (const { debrief, checks, fixes } of ranked) {
        console.log(
          `\n  ${debrief.createdAt.toISOString().slice(0, 10)} · ${debrief.lead.business} · ` +
            `${debrief.model} · ${fixes} fixed · debrief ${debrief.id}`,
        );
        console.log(`    Note: ${debrief.note}`);
        for (const c of checks.filter((check) => check.fixed)) {
          console.log(`    - ${FIELD_LABEL[c.field]}: ${c.detail}`);
        }
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
