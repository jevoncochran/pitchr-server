-- Optimized routes for sessions (docs/route-planning.md)
ALTER TABLE "OutreachSession" ADD COLUMN "routePolyline" TEXT,
ADD COLUMN "routeStartLabel" TEXT,
ADD COLUMN "routeStartLat" DOUBLE PRECISION,
ADD COLUMN "routeStartLng" DOUBLE PRECISION,
ADD COLUMN "routeReturns" BOOLEAN,
ADD COLUMN "routeSeconds" INTEGER,
ADD COLUMN "routeMeters" INTEGER,
ADD COLUMN "routeOptimizedAt" TIMESTAMP(3);

ALTER TABLE "SessionItem" ADD COLUMN "legSeconds" INTEGER,
ADD COLUMN "legMeters" INTEGER;
