-- Coordinates and Google place ID for locations (docs/address-backfill.md)
ALTER TABLE "Location" ADD COLUMN "latitude" DOUBLE PRECISION,
ADD COLUMN "longitude" DOUBLE PRECISION,
ADD COLUMN "googlePlaceId" TEXT;
