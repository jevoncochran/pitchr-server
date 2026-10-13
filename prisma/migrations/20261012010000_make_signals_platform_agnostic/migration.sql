-- Signal types are now network-agnostic; the network is stored separately in "platform".
ALTER TYPE "SignalType" RENAME VALUE 'INSTAGRAM_FOLLOW' TO 'FOLLOW';

-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'YOUTUBE', 'LINKEDIN', 'OTHER');

-- AlterTable
ALTER TABLE "Signal" ADD COLUMN "platform" "SocialPlatform";

-- Any follows logged under the old type were Instagram follows
UPDATE "Signal" SET "platform" = 'INSTAGRAM' WHERE "type" = 'FOLLOW' AND "platform" IS NULL;
