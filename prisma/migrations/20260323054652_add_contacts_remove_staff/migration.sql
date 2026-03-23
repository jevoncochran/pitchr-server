/*
  Warnings:

  - You are about to drop the column `staffId` on the `PhoneNumber` table. All the data in the column will be lost.
  - You are about to drop the `BusinessStaff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BusinessStaff" DROP CONSTRAINT "BusinessStaff_businessId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BusinessStaff" DROP CONSTRAINT "BusinessStaff_positionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BusinessStaff" DROP CONSTRAINT "BusinessStaff_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PhoneNumber" DROP CONSTRAINT "PhoneNumber_staffId_fkey";

-- AlterTable
ALTER TABLE "public"."PhoneNumber" DROP COLUMN "staffId";

-- DropTable
DROP TABLE "public"."BusinessStaff";

-- DropTable
DROP TABLE "public"."Position";

-- DropTable
DROP TABLE "public"."Staff";

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isDecisionMaker" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "leadId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
