/*
  Warnings:

  - The `howWeMet` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContactSource" AS ENUM ('OUTREACH', 'REFERRAL', 'FORM', 'NETWORKING', 'IN_PERSON', 'OTHER');

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "howWeMetNote" TEXT,
DROP COLUMN "howWeMet",
ADD COLUMN     "howWeMet" "ContactSource";
