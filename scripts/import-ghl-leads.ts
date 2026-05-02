import { PrismaClient, TouchPointType } from '@prisma/client';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

const CSV_PATH = '/Users/jevoncochran/Desktop/projects/pitchr-server/scripts/opportunities.csv';

function inferTouchpointType(summary: string): TouchPointType {
  const lower = summary.toLowerCase();
  if (lower.includes('email')) return TouchPointType.EMAIL;
  if (lower.includes('instagram') || lower.includes(' ig ') || lower.startsWith('ig ') || lower.includes('dm')) return TouchPointType.INSTAGRAM_DM;
  if (lower.includes('called') || lower.includes('phone call')) return TouchPointType.CALL;
  if (lower.includes('text') || lower.includes('texted')) return TouchPointType.TEXT;
  if (lower.includes('discovery meeting') || lower.includes('meeting')) return TouchPointType.MEETING;
  return TouchPointType.IN_PERSON;
}

function parseDate(dateStr: string): Date | null {
  const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})/);
  if (!match) return null;
  const [, month, day, year] = match;
  return new Date(`20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T12:00:00Z`);
}

function parseNotes(notes: string): { date: Date; type: TouchPointType; summary: string }[] {
  const touchpoints: { date: Date; type: TouchPointType; summary: string }[] = [];
  const lines = notes.split('\n');

  let currentDate: Date | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentDate && currentLines.length > 0) {
      const summary = currentLines.join(' ').trim();
      if (summary) {
        touchpoints.push({
          date: currentDate,
          type: inferTouchpointType(summary),
          summary,
        });
      }
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const dateMatch = trimmed.match(/^(\d{1,2}\/\d{1,2}\/\d{2})\s*[-–]\s*(.*)/);
    if (dateMatch) {
      flush();
      currentDate = parseDate(dateMatch[1]);
      currentLines = dateMatch[2] ? [dateMatch[2]] : [];
    } else if (currentDate) {
      currentLines.push(trimmed);
    }
  }

  flush();
  return touchpoints;
}

async function findOrCreateIndustry(name: string) {
  if (!name) return null;
  const normalized = name.trim();
  let industry = await prisma.industry.findFirst({
    where: { name: { equals: normalized, mode: 'insensitive' } },
  });
  if (!industry) {
    industry = await prisma.industry.create({ data: { name: normalized } });
    console.log(`  Created industry: ${normalized}`);
  }
  return industry;
}

async function findOrCreateBusinessType(name: string) {
  if (!name) return null;
  const normalized = name.trim();
  let bt = await prisma.businessType.findFirst({
    where: { name: { equals: normalized, mode: 'insensitive' } },
  });
  if (!bt) {
    bt = await prisma.businessType.create({ data: { name: normalized } });
    console.log(`  Created business type: ${normalized}`);
  }
  return bt;
}

async function main() {
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: false,
    relax_quotes: true,
    relax_column_count: true,
    trim: false,
  }) as Record<string, string>[];

  const adminUser = await prisma.user.findFirst({
    where: { email: 'jevon@interconvisuals.com' },
  });

  if (!adminUser) throw new Error('Admin user not found. Run the seed script first.');

  // Fallback industry/business type in case CSV values are empty
  let fallbackIndustry = await prisma.industry.findFirst();
  if (!fallbackIndustry) {
    fallbackIndustry = await prisma.industry.create({ data: { name: 'Other' } });
  }
  let fallbackBt = await prisma.businessType.findFirst();
  if (!fallbackBt) {
    fallbackBt = await prisma.businessType.create({ data: { name: 'Other' } });
  }

  console.log(`\nImporting ${records.length} leads...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const record of records) {
    const businessName = record['Opportunity Name']?.trim();
    if (!businessName) continue;

    try {
      const industryName = record['Industry']?.trim();
      const businessTypeName = record['Business Type']?.trim();
      const email = record['email']?.trim() || undefined;
      const notes = record['Notes'] || '';

      const industry = industryName
        ? await findOrCreateIndustry(industryName)
        : fallbackIndustry;

      const businessType = businessTypeName
        ? await findOrCreateBusinessType(businessTypeName)
        : fallbackBt;

      const lead = await prisma.lead.create({
        data: {
          business: businessName,
          industryId: industry!.id,
          businessTypeId: businessType!.id,
          pipelineStage: 'NEW',
          source: 'OUTREACH',
          discoveredVia: 'OUTREACH',
          email: email || undefined,
        },
      });

      const touchpoints = parseNotes(notes);
      for (const tp of touchpoints) {
        await prisma.touchPoint.create({
          data: {
            leadId: lead.id,
            date: tp.date,
            type: tp.type,
            summary: tp.summary,
            contactedById: adminUser.id,
          },
        });
      }

      console.log(`✓ ${businessName} (${touchpoints.length} touchpoints)`);
      successCount++;
    } catch (err: any) {
      console.error(`✗ ${businessName}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n✅ Done: ${successCount} imported, ${errorCount} failed.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
