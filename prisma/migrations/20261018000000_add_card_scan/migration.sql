-- Card scan (docs/card-scan.md)
-- CreateEnum
CREATE TYPE "CardScanStatus" AS ENUM ('PENDING', 'CARD', 'NOT_CARD', 'NEEDS_MATCH', 'FAILED');

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "cardData" JSONB,
ADD COLUMN     "cardScan" "CardScanStatus",
ADD COLUMN     "cardScannedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ContactChangeSuggestion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "currentValue" TEXT,
    "suggestedValue" TEXT NOT NULL,
    "attachmentId" TEXT,

    CONSTRAINT "ContactChangeSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactChangeSuggestion_contactId_field_key" ON "ContactChangeSuggestion"("contactId", "field");

-- AddForeignKey
ALTER TABLE "ContactChangeSuggestion" ADD CONSTRAINT "ContactChangeSuggestion_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactChangeSuggestion" ADD CONSTRAINT "ContactChangeSuggestion_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

