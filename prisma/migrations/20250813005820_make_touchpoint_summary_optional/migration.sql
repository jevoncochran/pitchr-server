-- AlterTable
ALTER TABLE "public"."TouchPoint" ALTER COLUMN "receivedResponse" SET DEFAULT false,
ALTER COLUMN "summary" DROP NOT NULL;
