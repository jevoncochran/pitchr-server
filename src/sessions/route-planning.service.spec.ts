import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  computeOptimizedRoute,
  GoogleUnavailableError,
} from 'src/common/google';
import { RoutePlanningService } from './route-planning.service';
import { SessionsService } from './sessions.service';

// Google is mocked: no real (paid) calls. straightLineMeters stays real.
jest.mock('src/common/google', () => ({
  ...jest.requireActual('src/common/google'),
  computeOptimizedRoute: jest.fn(),
}));
const route = computeOptimizedRoute as jest.MockedFunction<
  typeof computeOptimizedRoute
>;

const db = {
  sessionItem: { findMany: jest.fn(), update: jest.fn((a: unknown) => a) },
  outreachSession: { update: jest.fn((a: unknown) => a) },
  $transaction: jest.fn(),
};
const sessions = {
  getEditable: jest.fn(),
  findOne: jest.fn().mockResolvedValue({ id: 's-1' }),
};
const service = new RoutePlanningService(
  db as unknown as DatabaseService,
  sessions as unknown as SessionsService,
);

const ME = { id: 'u-1', role: 'STAFF' };
// Downtown Tampa
const START = { latitude: 27.95, longitude: -82.46, label: 'Office' };

const item = (id: string, at: [number, number] | null, status = 'PLANNED') => ({
  id,
  status,
  lead: {
    primaryLocation: at ? { latitude: at[0], longitude: at[1] } : null,
  },
});

// Ybor (near), Westshore (near), Wesley Chapel (far)
const YBOR = item('ybor', [27.96, -82.44]);
const WESTSHORE = item('westshore', [27.95, -82.53]);
const WESLEY = item('wesley', [28.19, -82.37]);

const savedPositions = () =>
  db.sessionItem.update.mock.calls
    .map(
      ([args]) => args as { where: { id: string }; data: { position: number } },
    )
    .sort((a, b) => a.data.position - b.data.position)
    .map((args) => args.where.id);

describe('RoutePlanningService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    route.mockResolvedValue({
      order: [1, 0],
      legs: [
        { seconds: 600, meters: 5000 },
        { seconds: 900, meters: 8000 },
        { seconds: 1800, meters: 30000 },
      ],
      seconds: 3300,
      meters: 43000,
      polyline: 'abc',
    });
  });

  it('ends at the stop farthest from the start and lets Google order the rest', async () => {
    db.sessionItem.findMany.mockResolvedValue([YBOR, WESLEY, WESTSHORE]);

    await service.optimize('s-1', { start: START, returnToStart: false }, ME);

    // Destination: Wesley Chapel; Ybor and Westshore are ordered between
    const [origin, between, destination] = route.mock.calls[0];
    expect(origin).toEqual(expect.objectContaining({ latitude: 27.95 }));
    expect(between).toEqual([
      { latitude: 27.96, longitude: -82.44 },
      { latitude: 27.95, longitude: -82.53 },
    ]);
    expect(destination).toEqual({ latitude: 28.19, longitude: -82.37 });
    // Google said [1, 0]: Westshore, then Ybor, then Wesley Chapel
    expect(savedPositions()).toEqual(['westshore', 'ybor', 'wesley']);
    expect(db.sessionItem.update).toHaveBeenCalledWith({
      where: { id: 'westshore' },
      data: { position: 0, legSeconds: 600, legMeters: 5000 },
    });
    expect(db.outreachSession.update).toHaveBeenCalledWith({
      where: { id: 's-1' },
      data: expect.objectContaining({
        routePolyline: 'abc',
        routeStartLabel: 'Office',
        routeReturns: false,
        routeSeconds: 3300,
      }),
    });
  });

  it('a round trip starts and ends at the start, with every stop ordered', async () => {
    db.sessionItem.findMany.mockResolvedValue([YBOR, WESTSHORE]);

    await service.optimize('s-1', { start: START, returnToStart: true }, ME);

    const [origin, between, destination] = route.mock.calls[0];
    expect(destination).toEqual(origin);
    expect(between).toHaveLength(2);
    expect(savedPositions()).toEqual(['westshore', 'ybor']);
  });

  it('keeps done and skipped stops on top and puts stops without coordinates last', async () => {
    db.sessionItem.findMany.mockResolvedValue([
      item('no-address', null),
      YBOR,
      item('visited', [27.9, -82.5], 'COMPLETED'),
      WESTSHORE,
      item('skipped', [27.9, -82.5], 'SKIPPED'),
      WESLEY,
    ]);

    await service.optimize('s-1', { start: START, returnToStart: false }, ME);

    expect(savedPositions()).toEqual([
      'visited',
      'skipped',
      'westshore',
      'ybor',
      'wesley',
      'no-address',
    ]);
    expect(db.sessionItem.update).toHaveBeenCalledWith({
      where: { id: 'no-address' },
      data: { position: 5, legSeconds: null, legMeters: null },
    });
  });

  it('refuses more than 25 stops before calling Google', async () => {
    db.sessionItem.findMany.mockResolvedValue(
      Array.from({ length: 26 }, (_, i) =>
        item(`s${i}`, [27.9 + i / 100, -82.4]),
      ),
    );

    await expect(
      service.optimize('s-1', { start: START, returnToStart: false }, ME),
    ).rejects.toThrow(BadRequestException);
    expect(route).not.toHaveBeenCalled();
  });

  it('needs a valid start and at least one stop on the map', async () => {
    db.sessionItem.findMany.mockResolvedValue([item('no-address', null)]);

    await expect(
      service.optimize('s-1', { start: START, returnToStart: false }, ME),
    ).rejects.toThrow('None of the planned stops');
    await expect(
      service.optimize(
        's-1',
        { start: { latitude: 200, longitude: 0 }, returnToStart: false },
        ME,
      ),
    ).rejects.toThrow('start needs a latitude and longitude');
  });

  it("explains when Google can't give a route, and saves nothing", async () => {
    db.sessionItem.findMany.mockResolvedValue([YBOR, WESTSHORE]);
    route.mockRejectedValue(new GoogleUnavailableError('down'));

    await expect(
      service.optimize('s-1', { start: START, returnToStart: true }, ME),
    ).rejects.toThrow(BadGatewayException);
    expect(db.$transaction).not.toHaveBeenCalled();
  });
});
