-- CreateEnum
CREATE TYPE "SessionChannel" AS ENUM ('IN_PERSON', 'CALL', 'INSTAGRAM_DM', 'EMAIL', 'TEXT', 'MIXED');

-- CreateEnum
CREATE TYPE "SessionItemStatus" AS ENUM ('PLANNED', 'COMPLETED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "TouchPointOutcome" AS ENUM ('BUSINESS_CLOSED', 'NO_ANSWER', 'LEFT_VOICEMAIL', 'DECISION_MAKER_NOT_AVAILABLE', 'COME_BACK_LATER', 'INTERESTED', 'NOT_INTERESTED', 'HAS_PROVIDER', 'NOT_A_FIT', 'MEETING_BOOKED');

-- CreateEnum
CREATE TYPE "TouchPointDelivery" AS ENUM ('SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "TouchPointResponse" AS ENUM ('PENDING', 'INTERESTED', 'COME_BACK_LATER', 'NOT_INTERESTED', 'HAS_PROVIDER', 'NOT_A_FIT', 'MEETING_BOOKED', 'NO_RESPONSE');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('VIDEO', 'MARKETING_AGENCY', 'UNKNOWN');

-- AlterTable
ALTER TABLE "TouchPoint" ADD COLUMN     "comeBackAt" TIMESTAMP(3),
ADD COLUMN     "delivery" "TouchPointDelivery",
ADD COLUMN     "leftMaterials" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "outcome" "TouchPointOutcome",
ADD COLUMN     "providerType" "ProviderType",
ADD COLUMN     "respondedOn" DATE,
ADD COLUMN     "response" "TouchPointResponse",
ADD COLUMN     "sessionId" TEXT;

-- CreateTable
CREATE TABLE "OutreachSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "channel" "SessionChannel" NOT NULL,
    "plannedFor" DATE,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "area" TEXT,
    "goal" INTEGER,
    "notes" TEXT,

    CONSTRAINT "OutreachSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessionId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "plannedTime" TIMESTAMP(3),
    "status" "SessionItemStatus" NOT NULL DEFAULT 'PLANNED',
    "touchPointId" TEXT,

    CONSTRAINT "SessionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OutreachSession_userId_plannedFor_idx" ON "OutreachSession"("userId", "plannedFor");

-- CreateIndex
CREATE UNIQUE INDEX "SessionItem_touchPointId_key" ON "SessionItem"("touchPointId");

-- CreateIndex
CREATE INDEX "SessionItem_sessionId_position_idx" ON "SessionItem"("sessionId", "position");

-- AddForeignKey
ALTER TABLE "TouchPoint" ADD CONSTRAINT "TouchPoint_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "OutreachSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachSession" ADD CONSTRAINT "OutreachSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionItem" ADD CONSTRAINT "SessionItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "OutreachSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionItem" ADD CONSTRAINT "SessionItem_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionItem" ADD CONSTRAINT "SessionItem_touchPointId_fkey" FOREIGN KEY ("touchPointId") REFERENCES "TouchPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

