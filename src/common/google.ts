import { Logger } from '@nestjs/common';

// Google Maps Platform calls, made with the server key (GOOGLE_API_KEY, which
// allows the Routes API and the Geocoding API). See docs/route-planning.md.

const logger = new Logger('Google');
const TIMEOUT_MS = 15_000;

export class GoogleUnavailableError extends Error {}

function apiKey() {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new GoogleUnavailableError('GOOGLE_API_KEY is not set');
  return key;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

/** Coordinates for an address, or null when Google can't find it. */
export async function geocodeAddress(
  address: string,
): Promise<(LatLng & { placeId: string }) | null> {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', address);
  url.searchParams.set('region', 'us');
  url.searchParams.set('key', apiKey());

  const started = Date.now();
  const response = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const body = (await response.json()) as {
    status: string;
    results?: {
      place_id: string;
      geometry: { location: { lat: number; lng: number } };
    }[];
  };
  logger.log(`geocode status=${body.status} ms=${Date.now() - started}`);

  if (body.status === 'ZERO_RESULTS') return null;
  if (body.status !== 'OK' || !body.results?.length) {
    throw new GoogleUnavailableError(`Geocoding failed: ${body.status}`);
  }
  const best = body.results[0];
  return {
    latitude: best.geometry.location.lat,
    longitude: best.geometry.location.lng,
    placeId: best.place_id,
  };
}

/** One leg of a route: from the previous point to the next. */
export interface RouteLeg {
  seconds: number;
  meters: number;
}

export interface ComputedRoute {
  /** For each intermediate stop, in driving order: its index in the request */
  order: number[];
  /** One leg per hop, in driving order (stops + 1 legs) */
  legs: RouteLeg[];
  seconds: number;
  meters: number;
  polyline: string;
}

/**
 * A driving route from origin through the stops to the destination, with the
 * stops put in the fastest order (Google's waypoint optimization, max 25).
 */
export async function computeOptimizedRoute(
  origin: LatLng,
  stops: LatLng[],
  destination: LatLng,
): Promise<ComputedRoute> {
  const point = (p: LatLng) => ({
    location: { latLng: { latitude: p.latitude, longitude: p.longitude } },
  });

  const started = Date.now();
  const response = await fetch(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey(),
        'X-Goog-FieldMask': [
          'routes.optimizedIntermediateWaypointIndex',
          'routes.legs.duration',
          'routes.legs.distanceMeters',
          'routes.duration',
          'routes.distanceMeters',
          'routes.polyline.encodedPolyline',
        ].join(','),
      },
      body: JSON.stringify({
        origin: point(origin),
        destination: point(destination),
        intermediates: stops.map(point),
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE',
        optimizeWaypointOrder: stops.length > 1,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );
  logger.log(
    `computeRoutes stops=${stops.length} status=${response.status} ms=${Date.now() - started}`,
  );
  if (!response.ok) {
    throw new GoogleUnavailableError(
      `Routes API returned ${response.status}: ${await response.text()}`,
    );
  }

  const body = (await response.json()) as {
    routes?: {
      optimizedIntermediateWaypointIndex?: number[];
      legs?: { duration?: string; distanceMeters?: number }[];
      duration?: string;
      distanceMeters?: number;
      polyline?: { encodedPolyline?: string };
    }[];
  };
  const route = body.routes?.[0];
  if (!route) throw new GoogleUnavailableError('Google found no driving route');

  // Durations come back as e.g. "754s"
  const seconds = (d?: string) => (d ? Math.round(parseFloat(d)) : 0);
  const optimized = route.optimizedIntermediateWaypointIndex;
  return {
    // With 0 or 1 stops (or no optimization) the order is as given
    order:
      optimized && optimized.length === stops.length && !optimized.includes(-1)
        ? optimized
        : stops.map((_, i) => i),
    legs: (route.legs ?? []).map((leg) => ({
      seconds: seconds(leg.duration),
      meters: leg.distanceMeters ?? 0,
    })),
    seconds: seconds(route.duration),
    meters: route.distanceMeters ?? 0,
    polyline: route.polyline?.encodedPolyline ?? '',
  };
}

/** Straight-line distance in meters. */
export function straightLineMeters(a: LatLng, b: LatLng) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) *
      Math.cos(rad(b.latitude)) *
      Math.sin(dLon / 2) ** 2;
  return 6_371_000 * 2 * Math.asin(Math.sqrt(h));
}
