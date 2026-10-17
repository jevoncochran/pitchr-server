-- A lead can be saved before its industry and business type are known
-- (docs/business-card-scan.md). Relaxes a rule only; no data changes.
ALTER TABLE "Lead" ALTER COLUMN "industryId" DROP NOT NULL,
ALTER COLUMN "businessTypeId" DROP NOT NULL;
