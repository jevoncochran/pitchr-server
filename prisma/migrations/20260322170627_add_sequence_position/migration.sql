-- CreateEnum
CREATE TYPE "public"."SequencePosition" AS ENUM ('VISIT_A', 'A1', 'A2', 'A3', 'VISIT_B', 'B1', 'B2', 'B3', 'VISIT_C', 'C1', 'C2', 'C3');

-- AlterTable
ALTER TABLE "public"."TouchPoint" ADD COLUMN     "sequencePosition" "public"."SequencePosition";
