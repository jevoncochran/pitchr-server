-- AlterTable
ALTER TABLE "public"."Lead" ADD COLUMN     "referredByLeadId" TEXT,
ADD COLUMN     "referredByName" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Lead" ADD CONSTRAINT "Lead_referredByLeadId_fkey" FOREIGN KEY ("referredByLeadId") REFERENCES "public"."Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
