-- AlterEnum
ALTER TYPE "public"."PipelineStage" ADD VALUE 'DORMANT';

-- AlterTable
ALTER TABLE "public"."Lead" ADD COLUMN     "sequenceActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sequenceStep" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Reminder" ADD COLUMN     "isCheckIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isEmailSentCheck" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isResponseCheck" BOOLEAN NOT NULL DEFAULT false;
