-- AlterEnum
ALTER TYPE "TouchPointType" ADD VALUE 'REFERRAL_OUTREACH';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "dormantReason" TEXT,
ADD COLUMN     "dormantRevisitAt" TIMESTAMP(3);
