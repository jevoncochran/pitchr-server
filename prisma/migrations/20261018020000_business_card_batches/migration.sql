-- Several business cards per upload (docs/business-card-scan.md). Adds only.
ALTER TYPE "BusinessCardScanStatus" ADD VALUE 'OTHER_BUSINESS' BEFORE 'FAILED';

ALTER TABLE "Attachment" ADD COLUMN "businessCardBatchId" TEXT;

CREATE INDEX "Attachment_businessCardBatchId_idx" ON "Attachment"("businessCardBatchId");
