-- CreateTable
CREATE TABLE "LeadStageChange" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "fromStage" "PipelineStage",
    "toStage" "PipelineStage" NOT NULL,
    "changedById" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadStageChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadStageChange_leadId_changedAt_idx" ON "LeadStageChange"("leadId", "changedAt");

-- AddForeignKey
ALTER TABLE "LeadStageChange" ADD CONSTRAINT "LeadStageChange_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadStageChange" ADD CONSTRAINT "LeadStageChange_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

