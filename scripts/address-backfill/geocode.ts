/**
 * Coordinates for locations saved before route planning (typed by hand, so
 * they have an address but no latitude/longitude). See docs/route-planning.md.
 *
 * Usage (from pitchr-server):
 *   npx ts-node scripts/address-backfill/geocode.ts --db prod            # lists them, no Google calls
 *   npx ts-node scripts/address-backfill/geocode.ts --db prod --apply    # one paid Geocoding call each
 *
 * Saves each result as it goes; addresses Google can't find are listed at the end.
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { geocodeAddress } from '../../src/common/google';

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  const db = args[args.indexOf('--db') + 1];
  if (db !== 'prod' && db !== 'dev') {
    throw new Error('Say which database: --db prod or --db dev');
  }
  const apply = args.includes('--apply');
  const url =
    db === 'prod' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;
  if (!url) throw new Error(`No database URL for ${db}`);

  const prisma = new PrismaClient({ datasources: { db: { url } } });
  console.log(
    `${apply ? 'Geocoding' : 'Dry run against'} ${db} (${new URL(url).hostname})`,
  );

  try {
    const locations = await prisma.location.findMany({
      where: { latitude: null },
      select: {
        id: true,
        addressLine1: true,
        city: true,
        state: true,
        zip: true,
        business: { select: { business: true } },
      },
    });
    console.log(`${locations.length} locations without coordinates`);

    const notFound: string[] = [];
    for (const loc of locations) {
      const address = [loc.addressLine1, loc.city, loc.state, loc.zip]
        .filter(Boolean)
        .join(', ');
      if (!apply) {
        console.log(`  ${loc.business.business}: ${address}`);
        continue;
      }
      const found = await geocodeAddress(address);
      if (!found) {
        notFound.push(`${loc.business.business}: ${address}`);
        continue;
      }
      await prisma.location.update({
        where: { id: loc.id },
        data: {
          latitude: found.latitude,
          longitude: found.longitude,
          googlePlaceId: found.placeId,
        },
      });
      console.log(`  ✓ ${loc.business.business}`);
    }

    if (!apply)
      console.log('\nNothing saved. Add --apply to look them up (paid).');
    else {
      console.log(`\nSaved ${locations.length - notFound.length}.`);
      notFound.forEach((n) => console.log(`  not found: ${n}`));
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
