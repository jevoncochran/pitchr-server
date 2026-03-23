-- AlterTable
ALTER TABLE "public"."Lead" ADD COLUMN     "facebookFollowers" INTEGER,
ADD COLUMN     "facebookHandle" TEXT,
ADD COLUMN     "instagramFollowers" INTEGER,
ADD COLUMN     "instagramHandle" TEXT,
ADD COLUMN     "tiktokFollowers" INTEGER,
ADD COLUMN     "tiktokHandle" TEXT,
ADD COLUMN     "youtubeFollowers" INTEGER,
ADD COLUMN     "youtubeHandle" TEXT;
