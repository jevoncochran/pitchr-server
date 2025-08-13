/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."TouchPoint" DROP CONSTRAINT "TouchPoint_contactedById_fkey";

-- AlterTable
ALTER TABLE "public"."Note" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "public"."TouchPoint" ALTER COLUMN "contactedById" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TouchPoint" ADD CONSTRAINT "TouchPoint_contactedById_fkey" FOREIGN KEY ("contactedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
