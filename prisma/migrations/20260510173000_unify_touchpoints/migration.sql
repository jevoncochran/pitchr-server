-- AlterEnum: add OTHER to TouchPointType
ALTER TYPE "TouchPointType" ADD VALUE 'OTHER';

-- AlterTable TouchPoint: make leadId and contactedById optional, add contactId
ALTER TABLE "TouchPoint" ALTER COLUMN "leadId" DROP NOT NULL;
ALTER TABLE "TouchPoint" ALTER COLUMN "contactedById" DROP NOT NULL;
ALTER TABLE "TouchPoint" ADD COLUMN "contactId" TEXT;

-- AddForeignKey TouchPoint.contactId -> Contact.id
ALTER TABLE "TouchPoint" ADD CONSTRAINT "TouchPoint_contactId_fkey"
  FOREIGN KEY ("contactId") REFERENCES "Contact"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

-- DropTable ContactInteraction
DROP TABLE IF EXISTS "ContactInteraction";
