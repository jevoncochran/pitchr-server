-- CreateTable
CREATE TABLE "_ContactToTouchPoint" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContactToTouchPoint_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContactToTouchPoint_B_index" ON "_ContactToTouchPoint"("B");

-- AddForeignKey
ALTER TABLE "_ContactToTouchPoint" ADD CONSTRAINT "_ContactToTouchPoint_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToTouchPoint" ADD CONSTRAINT "_ContactToTouchPoint_B_fkey" FOREIGN KEY ("B") REFERENCES "TouchPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
