-- Visit debrief (docs/visit-debrief.md): each dictated note and its proposal. Adds only.
-- CreateTable
CREATE TABLE "VisitDebrief" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "proposal" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "touchPointId" TEXT,

    CONSTRAINT "VisitDebrief_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitDebrief_touchPointId_key" ON "VisitDebrief"("touchPointId");

-- CreateIndex
CREATE INDEX "VisitDebrief_sessionId_idx" ON "VisitDebrief"("sessionId");

-- CreateIndex
CREATE INDEX "VisitDebrief_leadId_idx" ON "VisitDebrief"("leadId");

-- AddForeignKey
ALTER TABLE "VisitDebrief" ADD CONSTRAINT "VisitDebrief_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "OutreachSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitDebrief" ADD CONSTRAINT "VisitDebrief_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitDebrief" ADD CONSTRAINT "VisitDebrief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitDebrief" ADD CONSTRAINT "VisitDebrief_touchPointId_fkey" FOREIGN KEY ("touchPointId") REFERENCES "TouchPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

