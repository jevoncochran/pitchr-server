import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { SessionItemStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import {
  computeOptimizedRoute,
  GoogleUnavailableError,
  LatLng,
  RouteLeg,
  straightLineMeters,
} from 'src/common/google';
import { SessionsService, SessionUser } from './sessions.service';

/** Google orders at most 25 stops per route. */
export const MAX_ROUTE_STOPS = 25;

export interface OptimizeRouteInput {
  /** Where the drive starts: the phone's location or a typed-in address */
  start: LatLng & { label?: string | null };
  /** Come back to the start at the end, or finish at the last stop */
  returnToStart: boolean;
}

/**
 * Puts a session's planned stops in the fastest driving order with one Google
 * Routes call, and saves the order, each stop's drive and the route.
 * See docs/route-planning.md.
 */
@Injectable()
export class RoutePlanningService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly sessionsService: SessionsService,
  ) {}

  async optimize(id: string, input: OptimizeRouteInput, user: SessionUser) {
    await this.sessionsService.getEditable(id, user);
    const start = parseStart(input?.start);
    const returnToStart = input?.returnToStart === true;

    const items = await this.databaseService.sessionItem.findMany({
      where: { sessionId: id },
      orderBy: { position: 'asc' },
      select: {
        id: true,
        status: true,
        lead: {
          select: {
            primaryLocation: { select: { latitude: true, longitude: true } },
          },
        },
      },
    });

    // Done and skipped stops keep their place at the top; planned stops
    // without coordinates can't be ordered, so they go last
    const done = items.filter((i) => i.status !== SessionItemStatus.PLANNED);
    const planned = items.filter((i) => i.status === SessionItemStatus.PLANNED);
    const stops = planned.flatMap((item) => {
      const loc = item.lead.primaryLocation;
      return loc?.latitude != null && loc.longitude != null
        ? [
            {
              id: item.id,
              point: { latitude: loc.latitude, longitude: loc.longitude },
            },
          ]
        : [];
    });
    const unmapped = planned.filter(
      (item) => !stops.some((s) => s.id === item.id),
    );

    if (stops.length === 0) {
      throw new BadRequestException(
        'None of the planned stops has an address on the map',
      );
    }
    if (stops.length > MAX_ROUTE_STOPS) {
      throw new BadRequestException(
        `Google can order up to ${MAX_ROUTE_STOPS} stops at once; this session has ${stops.length}. Split it into two sessions.`,
      );
    }

    // Google needs a fixed end. For a round trip it's the start; otherwise
    // it's the stop farthest from the start, and Google orders the others
    let ordered: typeof stops;
    let legs: RouteLeg[];
    let route: { seconds: number; meters: number; polyline: string };
    try {
      if (returnToStart) {
        const result = await computeOptimizedRoute(
          start,
          stops.map((s) => s.point),
          start,
        );
        ordered = result.order.map((i) => stops[i]);
        legs = result.legs;
        route = result;
      } else {
        const last = stops.reduce((far, s) =>
          straightLineMeters(start, s.point) >
          straightLineMeters(start, far.point)
            ? s
            : far,
        );
        const between = stops.filter((s) => s !== last);
        const result = await computeOptimizedRoute(
          start,
          between.map((s) => s.point),
          last.point,
        );
        ordered = [...result.order.map((i) => between[i]), last];
        legs = result.legs;
        route = result;
      }
    } catch (error) {
      if (error instanceof GoogleUnavailableError) {
        throw new BadGatewayException(
          "Couldn't get a route from Google. Try again in a moment.",
        );
      }
      throw error;
    }

    // Leg i is the drive to the i-th stop (a round trip has one more leg, home)
    const legFor = new Map(ordered.map((stop, i) => [stop.id, legs[i]]));
    const order = [...done, ...ordered, ...unmapped].map((item) => item.id);

    await this.databaseService.$transaction([
      ...order.map((itemId, position) =>
        this.databaseService.sessionItem.update({
          where: { id: itemId },
          data: {
            position,
            legSeconds: legFor.get(itemId)?.seconds ?? null,
            legMeters: legFor.get(itemId)?.meters ?? null,
          },
        }),
      ),
      this.databaseService.outreachSession.update({
        where: { id },
        data: {
          routePolyline: route.polyline,
          routeStartLabel: start.label,
          routeStartLat: start.latitude,
          routeStartLng: start.longitude,
          routeReturns: returnToStart,
          routeSeconds: route.seconds,
          routeMeters: route.meters,
          routeOptimizedAt: new Date(),
        },
      }),
    ]);
    return this.sessionsService.findOne(id, user);
  }
}

function parseStart(start: OptimizeRouteInput['start'] | undefined) {
  const lat = Number(start?.latitude);
  const lng = Number(start?.longitude);
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    Math.abs(lat) > 90 ||
    Math.abs(lng) > 180
  ) {
    throw new BadRequestException('start needs a latitude and longitude');
  }
  const label =
    typeof start?.label === 'string' && start.label.trim()
      ? start.label.trim()
      : null;
  return { latitude: lat, longitude: lng, label };
}
