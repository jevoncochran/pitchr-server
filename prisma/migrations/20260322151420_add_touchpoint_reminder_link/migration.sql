-- AlterTable
ALTER TABLE "public"."Reminder" ADD COLUMN     "touchPointId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Reminder" ADD CONSTRAINT "Reminder_touchPointId_fkey" FOREIGN KEY ("touchPointId") REFERENCES "public"."TouchPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
