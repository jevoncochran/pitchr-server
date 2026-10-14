/**
 * Address backfill, part 1: look up every lead with no address on Google Places
 * and write a review file. Reads the database only; nothing is saved.
 * See docs/address-backfill.md.
 *
 * Usage (from pitchr-server):
 *   npx ts-node scripts/address-backfill/lookup.ts --db prod --limit 10
 *   npx ts-node scripts/address-backfill/lookup.ts --db prod --merge output/lookup-prod-<time>.json
 *
 * --merge skips leads already in an earlier lookup and writes one combined file.
 *
 * Each lead is one Google Text Search request (paid, with phone and website).
 * Writes scripts/address-backfill/output/lookup-<time>.json (everything, for the
 * save step) and .csv (for review: set "approve" to yes / no).
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

// Tampa, and how far counts as "Tampa Bay" (covers St. Pete, Clearwater,
// Wesley Chapel, Brandon, Lakeland)
const TAMPA = { latitude: 27.9506, longitude: -82.4572 };
const SEARCH_RADIUS_M = 50_000; // the most Google allows for a location bias
const TAMPA_BAY_KM = 80;

const FIELDS = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.addressComponents',
  'places.location',
  'places.nationalPhoneNumber',
  'places.websiteUri',
  'places.businessStatus',
  'places.googleMapsUri',
].join(',');

const OUTPUT_DIR = path.join(__dirname, 'output');

interface GooglePlace {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  addressComponents?: {
    longText: string;
    shortText: string;
    types: string[];
  }[];
  location?: { latitude: number; longitude: number };
  nationalPhoneNumber?: string;
  websiteUri?: string;
  businessStatus?: string;
  googleMapsUri?: string;
}

export type Confidence = 'confident' | 'check' | 'not found';

export interface LookupResult {
  leadId: string;
  business: string;
  stage: string;
  ourWebsite: string | null;
  confidence: Confidence;
  reasons: string[];
  match: null | {
    placeId: string;
    name: string;
    formattedAddress: string;
    address: {
      addressLine1: string | null;
      addressLine2: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
    };
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    website: string | null;
    mapsUrl: string | null;
    distanceKm: number | null;
    nameScore: number;
  };
  otherCandidates: string[];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const value = (flag: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const db = value('--db');
  if (db !== 'prod' && db !== 'dev') {
    throw new Error('Say which database to read: --db prod or --db dev');
  }
  const limit = value('--limit') ? Number(value('--limit')) : undefined;
  const merge = value('--merge');
  return { db, limit, merge };
}

// ── Matching ────────────────────────────────────────────────────────────────

const FILLER_WORDS = new Set([
  'the',
  'and',
  'of',
  'llc',
  'inc',
  'co',
  'corp',
  'pllc',
  'pa',
  'md',
  'group',
  'company',
  'tampa',
  'fl',
  'florida',
  // Some imported leads are named "Prospect <business>"
  'prospect',
]);

function nameTokens(name: string) {
  return name
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((t) => t && !FILLER_WORDS.has(t));
}

/** Share of our name's words that appear in Google's name (0 to 1). */
export function nameScore(ours: string, theirs: string) {
  const a = nameTokens(ours);
  const b = nameTokens(theirs);
  if (a.length === 0) return 0;
  // "GAV PRO" vs "GAVPRO": the same name, spaced differently
  if (b.join('').includes(a.join(''))) return 1;
  const theirWords = new Set(b);
  return a.filter((t) => theirWords.has(t)).length / a.length;
}

function domain(url: string | null | undefined) {
  if (!url) return null;
  try {
    const withScheme = /^https?:\/\//.test(url) ? url : `https://${url}`;
    return new URL(withScheme).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}

/** A website without tracking tags (?utm_source=...). */
export function cleanWebsite(url: string | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    [...parsed.searchParams.keys()]
      .filter((key) => key.startsWith('utm_'))
      .forEach((key) => parsed.searchParams.delete(key));
    return parsed.toString();
  } catch {
    return url;
  }
}

function distanceKm(a: typeof TAMPA, b: typeof TAMPA) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) *
      Math.cos(rad(b.latitude)) *
      Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

function parseAddress(place: GooglePlace) {
  const part = (type: string, short = false) => {
    const c = place.addressComponents?.find((x) => x.types.includes(type));
    return c ? (short ? c.shortText : c.longText) : null;
  };
  const street = [part('street_number'), part('route')]
    .filter(Boolean)
    .join(' ');
  const unit = part('subpremise');
  return {
    addressLine1: street || null,
    addressLine2: unit ? (/^\d/.test(unit) ? `Unit ${unit}` : unit) : null,
    city: part('locality') ?? part('sublocality') ?? part('postal_town'),
    state: part('administrative_area_level_1', true),
    zip: part('postal_code'),
  };
}

/** Sorts a lead's search results into confident / check / not found. */
export function classify(
  lead: { business: string; website: string | null },
  places: GooglePlace[],
): Pick<LookupResult, 'confidence' | 'reasons' | 'match' | 'otherCandidates'> {
  if (places.length === 0) {
    return {
      confidence: 'not found',
      reasons: ['No results'],
      match: null,
      otherCandidates: [],
    };
  }

  const ourDomain = domain(lead.website);
  const scored = places.map((place) => ({
    place,
    score: nameScore(lead.business, place.displayName?.text ?? ''),
    sameWebsite: !!ourDomain && domain(place.websiteUri) === ourDomain,
  }));
  // Best first: a matching website beats any name score
  scored.sort(
    (x, y) =>
      Number(y.sameWebsite) - Number(x.sameWebsite) || y.score - x.score,
  );
  const best = scored[0];
  const place = best.place;

  const address = parseAddress(place);
  const distance = place.location ? distanceKm(TAMPA, place.location) : null;
  const inTampaBay = distance !== null && distance <= TAMPA_BAY_KM;
  const nameMatches = best.sameWebsite || best.score >= 0.4;
  const reasons: string[] = [];

  if (best.sameWebsite) {
    // Our own website: the right business, wherever it is (e.g. Orlando leads)
    reasons.push('Same website as ours');
  } else if (!nameMatches) {
    reasons.push(
      `Closest result "${place.displayName?.text}" doesn't match the name`,
    );
  } else {
    if (best.score < 0.8) reasons.push('Name only partly matches');
    if (!inTampaBay) {
      reasons.push(
        `Outside Tampa Bay (${distance?.toFixed(0) ?? '?'} km from Tampa)`,
      );
    }
    // A chain with several Tampa Bay locations: which one is ours?
    const rivals = scored.filter(
      (s) =>
        s !== best &&
        s.score >= best.score &&
        s.place.formattedAddress !== place.formattedAddress &&
        !!s.place.location &&
        distanceKm(TAMPA, s.place.location) <= TAMPA_BAY_KM,
    );
    if (inTampaBay && rivals.length > 0) {
      reasons.push(`${rivals.length + 1} Tampa Bay locations match the name`);
    }
  }
  if (place.businessStatus && place.businessStatus !== 'OPERATIONAL') {
    reasons.push(
      `Google says ${place.businessStatus.toLowerCase().replace(/_/g, ' ')}`,
    );
  }
  if (
    !address.addressLine1 ||
    !address.city ||
    !address.state ||
    !address.zip
  ) {
    reasons.push('Incomplete address');
  }

  const confidence: Confidence = !nameMatches
    ? 'not found'
    : reasons.every((r) => r === 'Same website as ours')
      ? 'confident'
      : 'check';

  return {
    confidence,
    reasons,
    // Kept even when "not found", so a right answer can still be approved
    match: {
      placeId: place.id,
      name: place.displayName?.text ?? '',
      formattedAddress: place.formattedAddress ?? '',
      address,
      latitude: place.location?.latitude ?? null,
      longitude: place.location?.longitude ?? null,
      phone: place.nationalPhoneNumber ?? null,
      website: cleanWebsite(place.websiteUri),
      mapsUrl: place.googleMapsUri ?? null,
      distanceKm: distance === null ? null : Math.round(distance),
      nameScore: Math.round(best.score * 100) / 100,
    },
    otherCandidates: scored
      .filter((s) => s !== best)
      .map((s) => `${s.place.displayName?.text} (${s.place.formattedAddress})`),
  };
}

// ── Google ──────────────────────────────────────────────────────────────────

async function searchGoogle(
  apiKey: string,
  business: string,
): Promise<GooglePlace[]> {
  const response = await fetch(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELDS,
      },
      body: JSON.stringify({
        textQuery: business,
        pageSize: 3,
        regionCode: 'US',
        locationBias: { circle: { center: TAMPA, radius: SEARCH_RADIUS_M } },
      }),
    },
  );
  if (!response.ok) {
    throw new Error(
      `Google returned ${response.status}: ${await response.text()}`,
    );
  }
  const body = (await response.json()) as { places?: GooglePlace[] };
  return body.places ?? [];
}

// ── Review file ─────────────────────────────────────────────────────────────

const csvCell = (value: unknown) => {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

function toCsv(results: LookupResult[]) {
  const header = [
    'approve',
    'confidence',
    'reasons',
    'our business',
    'stage',
    'google name',
    'address',
    'phone',
    'google website',
    'our website',
    'km from Tampa',
    'google maps',
    'other results',
    'lead id',
    'place id',
  ];
  const rows = results.map((r) => [
    r.confidence === 'confident' ? 'yes' : '',
    r.confidence,
    r.reasons.join('; '),
    r.business,
    r.stage,
    r.match?.name,
    r.match?.formattedAddress,
    r.match?.phone,
    r.match?.website,
    r.ourWebsite,
    r.match?.distanceKm,
    r.match?.mapsUrl,
    r.otherCandidates.join(' | '),
    r.leadId,
    r.match?.placeId,
  ]);
  return (
    [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n') + '\n'
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

const ORDER: Record<Confidence, number> = {
  check: 0,
  'not found': 1,
  confident: 2,
};
const INACTIVE_STAGES = ['CONVERTED', 'NOT_A_FIT', 'LOST'];

async function main() {
  const { db, limit, merge } = parseArgs();
  const earlier: LookupResult[] = merge
    ? JSON.parse(fs.readFileSync(path.resolve(__dirname, merge), 'utf8'))
    : [];
  const done = new Set(earlier.map((r) => r.leadId));
  const url =
    db === 'prod' ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!url) throw new Error(`No database URL for ${db}`);
  if (!apiKey) throw new Error('GOOGLE_API_KEY is not set');

  const prisma = new PrismaClient({ datasources: { db: { url } } });
  console.log(`Reading leads from ${db} (${new URL(url).hostname})`);

  try {
    const leads = await prisma.lead.findMany({
      where: { locations: { none: {} } },
      select: { id: true, business: true, pipelineStage: true, website: true },
      orderBy: { business: 'asc' },
    });
    // Active leads first, so a limited run checks the ones that matter most
    leads.sort(
      (a, b) =>
        Number(INACTIVE_STAGES.includes(a.pipelineStage)) -
        Number(INACTIVE_STAGES.includes(b.pipelineStage)),
    );
    const todo = leads.filter((lead) => !done.has(lead.id));
    const batch = limit ? todo.slice(0, limit) : todo;
    console.log(
      `${leads.length} leads have no address; ${done.size} already looked up; looking up ${batch.length}`,
    );

    // Earlier results for leads that still have no address
    const stillMissing = new Set(leads.map((lead) => lead.id));
    const results: LookupResult[] = earlier
      .filter((r) => stillMissing.has(r.leadId))
      .map((r) =>
        r.match
          ? {
              ...r,
              match: {
                ...r.match,
                website: cleanWebsite(r.match.website ?? undefined),
              },
            }
          : r,
      );
    for (const [i, lead] of batch.entries()) {
      const places = await searchGoogle(apiKey, lead.business);
      const result: LookupResult = {
        leadId: lead.id,
        business: lead.business,
        stage: lead.pipelineStage,
        ourWebsite: lead.website,
        ...classify(lead, places),
      };
      results.push(result);
      console.log(
        `${i + 1}/${batch.length} ${result.confidence.padEnd(9)} ${lead.business}`,
      );
    }

    results.sort((a, b) => ORDER[a.confidence] - ORDER[b.confidence]);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const base = path.join(OUTPUT_DIR, `lookup-${db}-${stamp}`);
    fs.writeFileSync(`${base}.json`, JSON.stringify(results, null, 2));
    fs.writeFileSync(`${base}.csv`, toCsv(results));

    const count = (c: Confidence) =>
      results.filter((r) => r.confidence === c).length;
    console.log(
      `\nConfident ${count('confident')} · check ${count('check')} · not found ${count('not found')}`,
    );
    console.log(`Review: ${base}.csv`);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
