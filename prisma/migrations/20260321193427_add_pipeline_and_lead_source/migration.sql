/*
  Warnings:

  - You are about to drop the column `status` on the `Lead` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PipelineStage" AS ENUM ('NEW', 'CONTACTED', 'ENGAGED', 'MEETING_SCHEDULED', 'PROPOSAL_SENT', 'CONVERTED');

-- CreateEnum
CREATE TYPE "public"."LeadSource" AS ENUM ('OUTREACH', 'REFERRAL', 'FORM');

-- CreateEnum
CREATE TYPE "public"."DiscoveredVia" AS ENUM ('OUTREACH', 'REFERRAL', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'YOUTUBE', 'GOOGLE', 'OTHER');

-- AlterEnum
ALTER TYPE "public"."TouchPointType" ADD VALUE 'MEETING';

-- AlterTable
ALTER TABLE "public"."Lead" DROP COLUMN "status",
ADD COLUMN     "convertedAt" TIMESTAMP(3),
ADD COLUMN     "discoveredVia" "public"."DiscoveredVia",
ADD COLUMN     "discoveredViaOther" TEXT,
ADD COLUMN     "pipelineStage" "public"."PipelineStage" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "source" "public"."LeadSource";

-- DropEnum
DROP TYPE "public"."Status";
