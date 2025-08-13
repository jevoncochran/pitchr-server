/*
  Warnings:

  - The `label` column on the `PhoneNumber` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."PhoneType" AS ENUM ('MOBILE', 'OFFICE', 'HOME');

-- AlterTable
ALTER TABLE "public"."PhoneNumber" DROP COLUMN "label",
ADD COLUMN     "label" "public"."PhoneType";

-- AlterTable
ALTER TABLE "public"."Staff" ALTER COLUMN "email" DROP NOT NULL;
