-- Card scan is now "business card scan" (docs/business-card-scan.md). Renames
-- only: nothing is dropped, and existing values are kept.
ALTER TYPE "CardScanStatus" RENAME TO "BusinessCardScanStatus";
ALTER TYPE "BusinessCardScanStatus" RENAME VALUE 'CARD' TO 'BUSINESS_CARD';
ALTER TYPE "BusinessCardScanStatus" RENAME VALUE 'NOT_CARD' TO 'NOT_BUSINESS_CARD';

ALTER TABLE "Attachment" RENAME COLUMN "cardScan" TO "businessCardScan";
ALTER TABLE "Attachment" RENAME COLUMN "cardScannedAt" TO "businessCardScannedAt";
ALTER TABLE "Attachment" RENAME COLUMN "cardData" TO "businessCardData";
