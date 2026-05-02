-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "noInPersonContact" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "dueDate" DROP NOT NULL;
