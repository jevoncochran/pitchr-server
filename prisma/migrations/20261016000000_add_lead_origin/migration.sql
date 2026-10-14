-- One "How this lead started" field (origin) replaces source and discoveredVia.
-- Existing leads are converted with the rules in docs/lead-origin.md, then the
-- old columns and enums are dropped.

-- CreateEnum
CREATE TYPE "LeadOrigin" AS ENUM ('IN_PERSON_VISIT', 'DM', 'EMAIL', 'TEXT', 'CALL', 'NETWORKING_EVENT', 'APPROACHED_US', 'WEBSITE_FORM', 'REFERRAL', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'YOUTUBE', 'GOOGLE', 'OTHER');

-- AlterTable: add origin; discoveredViaOther becomes originOther
ALTER TABLE "Lead" ADD COLUMN "origin" "LeadOrigin";
ALTER TABLE "Lead" RENAME COLUMN "discoveredViaOther" TO "originOther";

-- Convert existing leads
WITH first_touch AS (
  SELECT DISTINCT ON ("leadId") "leadId", "type"
  FROM "TouchPoint"
  WHERE "leadId" IS NOT NULL
  ORDER BY "leadId", "date", "createdAt"
)
UPDATE "Lead" l
SET "origin" = (CASE
  WHEN l."source" = 'NETWORKING' THEN 'NETWORKING_EVENT'
  WHEN l."source" = 'REFERRAL' THEN 'REFERRAL'
  WHEN l."source" = 'IN_PERSON' THEN 'APPROACHED_US'
  WHEN l."source" = 'FORM' THEN CASE
    WHEN l."discoveredVia" IN ('INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'YOUTUBE', 'GOOGLE', 'OTHER')
      THEN l."discoveredVia"::text
    ELSE 'WEBSITE_FORM'
  END
  -- Outreach or empty: the first touchpoint says how, if it can
  ELSE CASE ft."type"
    WHEN 'IN_PERSON' THEN 'IN_PERSON_VISIT'
    WHEN 'VISIT_ATTEMPT' THEN 'IN_PERSON_VISIT'
    WHEN 'INSTAGRAM_DM' THEN 'DM'
    WHEN 'EMAIL' THEN 'EMAIL'
    WHEN 'TEXT' THEN 'TEXT'
    WHEN 'CALL' THEN 'CALL'
    ELSE NULL
  END
END)::"LeadOrigin"
FROM "Lead" l2
LEFT JOIN first_touch ft ON ft."leadId" = l2."id"
WHERE l2."id" = l."id";

-- The description only goes with Other
UPDATE "Lead" SET "originOther" = NULL WHERE "origin" IS DISTINCT FROM 'OTHER';

-- AlterTable: drop the old fields
ALTER TABLE "Lead" DROP COLUMN "source",
DROP COLUMN "discoveredVia";

-- DropEnum
DROP TYPE "LeadSource";
DROP TYPE "DiscoveredVia";
