/**
 * Address backfill, part 2: save the approved matches from a reviewed lookup.
 * See docs/address-backfill.md.
 *
 * Usage (from pitchr-server):
 *   npx ts-node scripts/address-backfill/save.ts --db prod --review output/review-prod-<time>.csv
 *   npx ts-node scripts/address-backfill/save.ts --db prod --review output/review-prod-<time>.csv --apply
 *
 * Without --apply it only prints what it would save. Rows whose "approve"
 * column is "yes" are saved, all in one transaction (all or nothing):
 * - a primary location with the address, coordinates and Google place ID
 * - Google's phone number on that location, when there is one
 * - Google's website, only when the lead has none
 * Leads that got an address since the lookup are skipped.
 *
 * Needs the 20261016020000_add_location_coordinates migration on that database.
 */
import { PrismaClient, PhoneType } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import type { LookupResult } from './lookup';

dotenv.config();

function parseArgs() {
  const args = process.argv.slice(2);
  const value = (flag: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const db = value('--db');
  if (db !== 'prod' && db !== 'dev') {
    throw new Error('Say which database to write: --db prod or --db dev');
  }
  const review = value('--review');
  if (!review)
    throw new Error('Say which reviewed file to save: --review <csv>');
  return {
    db,
    review: path.resolve(__dirname, review),
    apply: args.includes('--apply'),
  };
}

async function main() {
  const { db, review, apply } = parseArgs();
  const url =
    db === 'prod' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;
  if (!url) throw new Error(`No database URL for ${db}`);

  // The review CSV says what's approved; the lookup JSON next to it has the data
  const rows: Record<string, string>[] = parse(fs.readFileSync(review), {
    bom: true,
    columns: true,
  });
  const lookupFile = review
    .replace('review-', 'lookup-')
    .replace(/\.csv$/, '.json');
  const results: LookupResult[] = JSON.parse(
    fs.readFileSync(lookupFile, 'utf8'),
  );
  const byLead = new Map(results.map((r) => [r.leadId, r]));

  const approved: LookupResult[] = [];
  const problems: string[] = [];
  for (const row of rows) {
    if (row.approve?.trim().toLowerCase() !== 'yes') continue;
    const result = byLead.get(row['lead id']);
    const a = result?.match?.address;
    if (!result?.match || !a?.addressLine1 || !a.city || !a.state || !a.zip) {
      problems.push(`${row['our business']}: no complete address to save`);
      continue;
    }
    approved.push(result);
  }

  const prisma = new PrismaClient({ datasources: { db: { url } } });
  console.log(
    `${apply ? 'Saving to' : 'Dry run against'} ${db} (${new URL(url).hostname})`,
  );

  try {
    const leads = await prisma.lead.findMany({
      where: { id: { in: approved.map((r) => r.leadId) } },
      select: {
        id: true,
        website: true,
        _count: { select: { locations: true } },
      },
    });
    const leadById = new Map(leads.map((l) => [l.id, l]));

    const toSave = approved.filter((r) => {
      const lead = leadById.get(r.leadId);
      if (!lead) problems.push(`${r.business}: lead no longer exists`);
      else if (lead._count.locations > 0)
        problems.push(`${r.business}: already has an address`);
      return lead && lead._count.locations === 0;
    });

    const websites = toSave.filter(
      (r) => r.match!.website && !leadById.get(r.leadId)!.website,
    );
    const phones = toSave.filter((r) => r.match!.phone);
    console.log(
      `${toSave.length} addresses (${phones.length} with a phone), ${websites.length} websites` +
        ` · ${rows.length - approved.length} rows not approved`,
    );
    problems.forEach((p) => console.log(`  skipped: ${p}`));

    if (!apply) {
      toSave
        .slice(0, 5)
        .forEach((r) =>
          console.log(`  e.g. ${r.business}: ${r.match!.formattedAddress}`),
        );
      console.log('\nNothing saved. Add --apply to save.');
      return;
    }

    await prisma.$transaction(
      async (tx) => {
        for (const r of toSave) {
          const m = r.match!;
          const location = await tx.location.create({
            data: {
              businessId: r.leadId,
              addressLine1: m.address.addressLine1!,
              addressLine2: m.address.addressLine2,
              city: m.address.city!,
              state: m.address.state!,
              zip: m.address.zip!,
              latitude: m.latitude,
              longitude: m.longitude,
              googlePlaceId: m.placeId,
              ...(m.phone && {
                phoneNumbers: {
                  create: { number: m.phone, label: PhoneType.OFFICE },
                },
              }),
            },
          });
          await tx.lead.update({
            where: { id: r.leadId },
            data: {
              primaryLocationId: location.id,
              ...(m.website &&
                !leadById.get(r.leadId)!.website && { website: m.website }),
            },
          });
        }
      },
      { timeout: 120_000 },
    );
    console.log(`\nSaved ${toSave.length} addresses.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
