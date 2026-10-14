import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { SessionsService } from './sessions.service';

const mockDb = {
  outreachSession: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  sessionItem: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  lead: { count: jest.fn() },
  $transaction: jest.fn(),
};

const ME = { id: 'user-1', role: 'STAFF' };
const ADMIN = { id: 'admin-1', role: 'ADMIN' };
const OTHER = { id: 'user-2', role: 'STAFF' };

const session = (overrides = {}) => ({
  id: 's-1',
  userId: ME.id,
  startedAt: null,
  endedAt: null,
  ...overrides,
});

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockDb.outreachSession.findUnique.mockResolvedValue(session());
    mockDb.outreachSession.create.mockResolvedValue({ id: 's-1' });
    mockDb.lead.count.mockImplementation(({ where }) => where.id.in.length);
    mockDb.sessionItem.findMany.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        { provide: DatabaseService, useValue: mockDb },
      ],
    }).compile();
    service = module.get(SessionsService);
  });

  describe('create', () => {
    it('creates the session for the logged-in user with its leads in order', async () => {
      await service.create(
        {
          channel: 'IN_PERSON',
          plannedFor: '2026-10-15',
          area: ' South Tampa ',
          goal: 12,
          leadIds: ['lead-a', 'lead-b'],
        },
        ME,
      );

      expect(mockDb.outreachSession.create).toHaveBeenCalledWith({
        data: {
          userId: ME.id,
          channel: 'IN_PERSON',
          plannedFor: new Date('2026-10-15T00:00:00Z'),
          area: 'South Tampa',
          goal: 12,
          items: {
            create: [
              { leadId: 'lead-a', position: 0 },
              { leadId: 'lead-b', position: 1 },
            ],
          },
        },
      });
    });

    it('rejects a missing or unknown channel, a bad date or a bad goal', async () => {
      await expect(service.create({} as never, ME)).rejects.toThrow(
        BadRequestException,
      );
      await expect(
        service.create({ channel: 'SMOKE_SIGNALS' as never }, ME),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.create({ channel: 'CALL', plannedFor: '10/15/26' }, ME),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.create({ channel: 'CALL', goal: 0 }, ME),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects leads that do not exist, or the same lead twice', async () => {
      mockDb.lead.count.mockResolvedValue(1);
      await expect(
        service.create({ channel: 'CALL', leadIds: ['lead-a', 'missing'] }, ME),
      ).rejects.toThrow(BadRequestException);

      mockDb.lead.count.mockImplementation(({ where }) => where.id.in.length);
      await expect(
        service.create({ channel: 'CALL', leadIds: ['lead-a', 'lead-a'] }, ME),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('who can see a session', () => {
    it("blocks another staff member's session", async () => {
      await expect(service.findOne('s-1', OTHER)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it("lets an admin see anyone's session", async () => {
      await service.findOne('s-1', ADMIN);
      expect(mockDb.outreachSession.findUnique).toHaveBeenCalledTimes(2);
    });

    it('returns 404 for a session that does not exist', async () => {
      mockDb.outreachSession.findUnique.mockResolvedValue(null);
      await expect(service.findOne('missing', ME)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("lists only your own sessions, unless an admin asks for everyone's", async () => {
      mockDb.outreachSession.findMany.mockResolvedValue([]);

      await service.findAll(ME, true); // staff asking for all: still their own
      expect(mockDb.outreachSession.findMany).toHaveBeenLastCalledWith(
        expect.objectContaining({ where: { userId: ME.id } }),
      );

      await service.findAll(ADMIN, true);
      expect(mockDb.outreachSession.findMany).toHaveBeenLastCalledWith(
        expect.objectContaining({ where: {} }),
      );
    });

    it('lists sessions with item counts', async () => {
      mockDb.outreachSession.findMany.mockResolvedValue([
        {
          id: 's-1',
          items: [
            { status: 'COMPLETED' },
            { status: 'COMPLETED' },
            { status: 'SKIPPED' },
            { status: 'PLANNED' },
          ],
        },
      ]);

      const [listed] = await service.findAll(ME);

      expect(listed).toEqual({
        id: 's-1',
        itemCounts: { total: 4, planned: 1, completed: 2, skipped: 1 },
      });
    });
  });

  describe('items', () => {
    it('adds leads after the last position', async () => {
      mockDb.sessionItem.findMany.mockResolvedValue([
        { leadId: 'lead-a', position: 0, status: 'COMPLETED' },
        { leadId: 'lead-b', position: 1, status: 'PLANNED' },
      ]);

      await service.addItems('s-1', ['lead-c'], ME);

      expect(mockDb.sessionItem.createMany).toHaveBeenCalledWith({
        data: [{ sessionId: 's-1', leadId: 'lead-c', position: 2 }],
      });
    });

    it("won't plan a lead that's already planned in the session", async () => {
      mockDb.sessionItem.findMany.mockResolvedValue([
        { leadId: 'lead-b', position: 0, status: 'PLANNED' },
      ]);

      await expect(service.addItems('s-1', ['lead-b'], ME)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('reorders when given every item exactly once', async () => {
      mockDb.sessionItem.findMany.mockResolvedValue([
        { id: 'i-1' },
        { id: 'i-2' },
      ]);

      await service.reorderItems('s-1', ['i-2', 'i-1'], ME);

      expect(mockDb.sessionItem.update).toHaveBeenCalledWith({
        where: { id: 'i-2' },
        data: { position: 0 },
      });
      expect(mockDb.sessionItem.update).toHaveBeenCalledWith({
        where: { id: 'i-1' },
        data: { position: 1 },
      });
      expect(mockDb.$transaction).toHaveBeenCalled();
    });

    it('rejects a reorder that leaves out or repeats an item', async () => {
      mockDb.sessionItem.findMany.mockResolvedValue([
        { id: 'i-1' },
        { id: 'i-2' },
      ]);

      await expect(service.reorderItems('s-1', ['i-1'], ME)).rejects.toThrow(
        BadRequestException,
      );
      await expect(
        service.reorderItems('s-1', ['i-1', 'i-1'], ME),
      ).rejects.toThrow(BadRequestException);
    });

    it("won't remove or skip a completed item", async () => {
      mockDb.sessionItem.findUnique.mockResolvedValue({
        id: 'i-1',
        sessionId: 's-1',
        status: 'COMPLETED',
      });

      await expect(service.removeItem('s-1', 'i-1', ME)).rejects.toThrow(
        BadRequestException,
      );
      await expect(
        service.setItemStatus('s-1', 'i-1', 'SKIPPED', ME),
      ).rejects.toThrow(BadRequestException);
    });

    it("won't mark an item completed directly", async () => {
      await expect(
        service.setItemStatus('s-1', 'i-1', 'COMPLETED', ME),
      ).rejects.toThrow(BadRequestException);
    });

    it("won't change the list of a session that has ended", async () => {
      mockDb.outreachSession.findUnique.mockResolvedValue(
        session({ startedAt: new Date(), endedAt: new Date() }),
      );

      await expect(service.addItems('s-1', ['lead-c'], ME)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('start and end', () => {
    it('starts a session once', async () => {
      await service.start('s-1', ME);
      expect(mockDb.outreachSession.update).toHaveBeenCalledWith({
        where: { id: 's-1' },
        data: { startedAt: expect.any(Date) },
      });
    });

    it("can't end a session that hasn't started", async () => {
      await expect(service.end('s-1', ME)).rejects.toThrow(BadRequestException);
    });

    it('ends a session and returns its duration and counts', async () => {
      const startedAt = new Date(Date.now() - 90 * 60_000);
      mockDb.outreachSession.findUnique.mockResolvedValue(
        session({ startedAt }),
      );
      mockDb.sessionItem.findMany.mockResolvedValue([
        { status: 'COMPLETED' },
        { status: 'SKIPPED' },
      ]);

      const summary = await service.end('s-1', ME);

      expect(summary.durationMinutes).toBe(90);
      expect(summary.itemCounts).toEqual({
        total: 2,
        planned: 0,
        completed: 1,
        skipped: 1,
      });
    });

    it("can't change the channel once the session has started", async () => {
      mockDb.outreachSession.findUnique.mockResolvedValue(
        session({ startedAt: new Date() }),
      );

      await expect(
        service.update('s-1', { channel: 'EMAIL' }, ME),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
