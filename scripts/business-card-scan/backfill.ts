/**
 * Read the photos uploaded before business card scan existed (docs/business-card-scan.md): each
 * image on a lead that has never been read.
 *
 * Usage (from pitchr-server, with pitchr-ai running at PITCHR_AI_URL), in order:
 *   npx ts-node -r tsconfig-paths/register scripts/business-card-scan/backfill.ts --db dev
 *     Lists the photos. No Claude calls.
 *   npx ts-node -r tsconfig-paths/register scripts/business-card-scan/backfill.ts --db dev --read
 *     One paid Claude call per photo. Prints what each would change and saves
 *     the readings to scripts/business-card-scan/output/. Nothing saved to the database.
 *   npx ts-node -r tsconfig-paths/register scripts/business-card-scan/backfill.ts --db dev --apply
 *     Applies the saved readings. No Claude calls.
 *
 * --apply re-checks each reading against the lead as it is then, and skips
 * photos that were read meanwhile. Prod only with the owner's sign-off.
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import {
  BusinessCardReading,
  BusinessCardScanPlan,
} from '../../src/attachments/business-card-scan-rules';
import {
  BusinessCardScanService,
  readBusinessCards,
} from '../../src/attachments/business-card-scan.service';
import { DatabaseService } from '../../src/database/database.service';

dotenv.config();

const OUTPUT_DIR = path.join(__dirname, 'output');

async function main() {
  const args = process.argv.slice(2);
  const db = args[args.indexOf('--db') + 1];
  if (db !== 'prod' && db !== 'dev') {
    throw new Error('Say which database: --db prod or --db dev');
  }
  const read = args.includes('--read');
  const apply = args.includes('--apply');
  if (read && apply) throw new Error('--read first, then --apply');

  const url =
    db === 'prod' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;
  if (!url) throw new Error(`No database URL for ${db}`);
  const readingsFile = path.join(OUTPUT_DIR, `readings-${db}.json`);

  const prisma = new PrismaClient({ datasources: { db: { url } } });
  const service = new BusinessCardScanService(
    prisma as unknown as DatabaseService,
  );
  const mode = apply
    ? 'Applying saved readings to'
    : read
      ? 'Reading photos (dry run) on'
      : 'Listing photos on';
  console.log(`${mode} ${db} (${new URL(url).hostname})`);

  try {
    const photos = await prisma.attachment.findMany({
      where: {
        mimeType: { startsWith: 'image/' },
        leadId: { not: null },
        businessCardScan: null,
      },
      include: {
        lead: {
          select: {
            business: true,
            contacts: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
                email: true,
                phone: true,
                isDecisionMaker: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    console.log(`${photos.length} photos never read\n`);

    if (!read && !apply) {
      photos.forEach((p) =>
        console.log(`  ${p.lead!.business}: ${p.filename}`),
      );
      console.log(
        '\nNothing read. Add --read to read them (one paid Claude call each).',
      );
      return;
    }

    if (read) {
      const readings: Record<string, BusinessCardReading> = {};
      for (const photo of photos) {
        try {
          // Photos uploaded before card scan were one per upload: each is read on its own
          const reading = await readBusinessCards(
            [{ url: photo.url }],
            photo.lead!,
          );
          readings[photo.id] = reading;
          const plan = await service.planReading([photo.id], reading);
          console.log(`${photo.lead!.business} (${photo.filename})`);
          describe(plan, reading).forEach((line) => console.log(`  ${line}`));
        } catch (error) {
          console.log(
            `${photo.lead!.business} (${photo.filename})\n  couldn't read: ${error}`,
          );
        }
      }
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      fs.writeFileSync(readingsFile, JSON.stringify(readings, null, 2));
      console.log(
        `\nNothing saved to ${db}. Readings in ${readingsFile}; --apply saves them.`,
      );
      return;
    }

    const readings = JSON.parse(
      fs.readFileSync(readingsFile, 'utf8'),
    ) as Record<string, BusinessCardReading>;
    const unread = new Set(photos.map((p) => p.id));
    let applied = 0;
    for (const [attachmentId, reading] of Object.entries(readings)) {
      if (!unread.has(attachmentId)) continue; // read since, or deleted
      await service.applyReading([attachmentId], reading);
      applied++;
    }
    console.log(
      `Applied ${applied} of ${Object.keys(readings).length} readings.`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

/** What a plan would do, in plain words. */
function describe(
  plan: BusinessCardScanPlan,
  reading: BusinessCardReading,
): string[] {
  const lines: string[] = [];
  for (const { personIndex, plan: person } of plan.people) {
    const card = reading.people[personIndex];
    const name = [card.firstName, card.lastName].filter(Boolean).join(' ');
    if (person.status === 'OTHER_BUSINESS') {
      lines.push(
        `business card for ${name} at ${card.businessName ?? 'another business'}: will ask`,
      );
    }
    if (person.status === 'NEEDS_MATCH') {
      lines.push(
        `business card for ${name}: could be more than one contact, will ask`,
      );
    }
    if (person.createContact) {
      const c = person.createContact;
      lines.push(
        `new contact: ${name}` +
          [c.title, c.email, c.phone]
            .filter(Boolean)
            .map((v) => `, ${v}`)
            .join('') +
          (c.isDecisionMaker ? ' (decision-maker)' : ''),
      );
    }
    if (person.updateContact) {
      lines.push(
        `fill in ${name}: ${Object.keys(person.updateContact.data).join(', ')}`,
      );
    }
    for (const s of person.suggestions) {
      lines.push(
        `suggest ${s.field}: "${s.currentValue}" → "${s.suggestedValue}"`,
      );
    }
    if (
      person.contactId &&
      !person.updateContact &&
      person.suggestions.length === 0
    ) {
      lines.push(`business card for ${name}: nothing new`);
    }
  }
  if (plan.businessOnlyPhotos.length > 0)
    lines.push('business card with no person on it');
  if (plan.notBusinessCardPhotos.length > 0) lines.push('not a business card');
  if (plan.leadWebsite) lines.push(`lead website: ${plan.leadWebsite}`);
  return lines;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
