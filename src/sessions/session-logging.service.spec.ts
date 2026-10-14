import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { TouchpointLoggingService } from 'src/touchpoints/touchpoint-logging.service';
import { SessionLoggingService } from './session-logging.service';
import { SessionsService } from './sessions.service';

// A fake database; $transaction runs the callback with the same fake
const tx = {
  outreachSession: { update: jest.fn() },
  sessionItem: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  lead: { create: jest.fn(), findUnique: jest.fn() },
  leadStageChange: { create: jest.fn() },
  contact: { count: jest.fn(), create: jest.fn() },
  task: { create: jest.fn() },
};
const mockDb = {
  ...tx,
  $transaction: jest.fn((callback: (t: typeof tx) => unknown) => callback(tx)),
};
const mockSessions = { getEditable: jest.fn(), findOne: jest.fn() };
const mockTouchpointLogging = { logWithin: jest.fn() };

const ME = { id: 'user-1', role: 'STAFF' };

const session = (overrides = {}) => ({
  id: 's-1',
  userId: ME.id,
  channel: 'IN_PERSON',
  startedAt: new Date(),
  endedAt: null,
  ...overrides,
});

describe('SessionLoggingService', () => {
  let service: SessionLoggingService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockSessions.getEditable.mockResolvedValue(session());
    mockSessions.findOne.mockResolvedValue({ id: 's-1' });
    mockTouchpointLogging.logWithin.mockResolvedValue({ id: 'tp-1' });
    tx.sessionItem.findUnique.mockResolvedValue({
      id: 'item-1',
      sessionId: 's-1',
      leadId: 'lead-1',
      status: 'PLANNED',
    });
    tx.sessionItem.findFirst.mockResolvedValue({ position: 4 });
    tx.sessionItem.create.mockResolvedValue({ id: 'item-new' });
    tx.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      pipelineStage: 'CONTACTED',
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionLoggingService,
        { provide: DatabaseService, useValue: mockDb },
        { provide: SessionsService, useValue: mockSessions },
        { provide: TouchpointLoggingService, useValue: mockTouchpointLogging },
      ],
    }).compile();
    service = module.get(SessionLoggingService);
  });

  it('logs a planned item with the session channel and completes the item', async () => {
    await service.log('s-1', { itemId: 'item-1', outcome: 'INTERESTED' }, ME);

    expect(mockTouchpointLogging.logWithin).toHaveBeenCalledWith(
      tx,
      expect.objectContaining({
        leadId: 'lead-1',
        type: 'IN_PERSON',
        outcome: 'INTERESTED',
        sessionId: 's-1',
      }),
      ME.id,
      expect.anything(),
    );
    expect(tx.sessionItem.update).toHaveBeenCalledWith({
      where: { id: 'item-1' },
      data: { status: 'COMPLETED', touchPointId: 'tp-1' },
    });
  });

  it('starts a session that has not started yet', async () => {
    mockSessions.getEditable.mockResolvedValue(session({ startedAt: null }));

    await service.log('s-1', { itemId: 'item-1', outcome: 'INTERESTED' }, ME);

    expect(tx.outreachSession.update).toHaveBeenCalledWith({
      where: { id: 's-1' },
      data: { startedAt: expect.any(Date) },
    });
  });

  it('adds an unplanned lead to the end of the list', async () => {
    await service.log('s-1', { leadId: 'lead-1', outcome: 'INTERESTED' }, ME);

    expect(tx.sessionItem.create).toHaveBeenCalledWith({
      data: { sessionId: 's-1', leadId: 'lead-1', position: 5 },
    });
  });

  it('quick-adds a business, starting its stage history', async () => {
    tx.lead.create.mockResolvedValue({ id: 'lead-new', pipelineStage: 'NEW' });

    await service.log(
      's-1',
      {
        newLead: {
          business: ' Bay Roofing ',
          industryId: 'i-1',
          businessTypeId: 'b-1',
          source: 'REFERRAL',
        },
        outcome: 'INTERESTED',
      },
      ME,
    );

    expect(tx.lead.create).toHaveBeenCalledWith({
      data: {
        business: 'Bay Roofing',
        industryId: 'i-1',
        businessTypeId: 'b-1',
        source: 'REFERRAL',
      },
    });
    expect(tx.leadStageChange.create).toHaveBeenCalled();
    expect(mockTouchpointLogging.logWithin).toHaveBeenCalledWith(
      tx,
      expect.objectContaining({ leadId: 'lead-new' }),
      ME.id,
      expect.anything(),
    );
  });

  it('a quick-added business defaults to Outreach as its source', async () => {
    tx.lead.create.mockResolvedValue({ id: 'lead-new', pipelineStage: 'NEW' });

    await service.log(
      's-1',
      {
        newLead: {
          business: 'Bay Roofing',
          industryId: 'i-1',
          businessTypeId: 'b-1',
        },
        outcome: 'INTERESTED',
      },
      ME,
    );

    expect(tx.lead.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ source: 'OUTREACH' }),
    });
  });

  it('needs exactly one way of saying which lead', async () => {
    await expect(
      service.log('s-1', { outcome: 'INTERESTED' }, ME),
    ).rejects.toThrow(BadRequestException);
    await expect(
      service.log(
        's-1',
        { itemId: 'item-1', leadId: 'lead-1', outcome: 'INTERESTED' },
        ME,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('needs a touchpoint type in a mixed session', async () => {
    mockSessions.getEditable.mockResolvedValue(session({ channel: 'MIXED' }));

    await expect(
      service.log('s-1', { itemId: 'item-1', outcome: 'INTERESTED' }, ME),
    ).rejects.toThrow(BadRequestException);
  });

  it("won't log an item twice", async () => {
    tx.sessionItem.findUnique.mockResolvedValue({
      id: 'item-1',
      sessionId: 's-1',
      leadId: 'lead-1',
      status: 'COMPLETED',
    });

    await expect(
      service.log('s-1', { itemId: 'item-1', outcome: 'INTERESTED' }, ME),
    ).rejects.toThrow(BadRequestException);
    expect(mockTouchpointLogging.logWithin).not.toHaveBeenCalled();
  });

  it('adds a new contact and links them to the touchpoint', async () => {
    tx.contact.create.mockResolvedValue({ id: 'contact-new' });

    await service.log(
      's-1',
      {
        itemId: 'item-1',
        outcome: 'INTERESTED',
        newContact: {
          firstName: 'Dana',
          title: 'Owner',
          isDecisionMaker: true,
        },
      },
      ME,
    );

    expect(tx.contact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        firstName: 'Dana',
        isDecisionMaker: true,
        leadId: 'lead-1',
      }),
    });
    expect(mockTouchpointLogging.logWithin).toHaveBeenCalledWith(
      tx,
      expect.objectContaining({ contactIds: ['contact-new'] }),
      ME.id,
      expect.anything(),
    );
  });

  it('rejects contacts that belong to a different lead', async () => {
    tx.contact.count.mockResolvedValue(0);

    await expect(
      service.log(
        's-1',
        { itemId: 'item-1', outcome: 'INTERESTED', contactIds: ['c-other'] },
        ME,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  describe('come back later', () => {
    it('creates a follow-up task at the time they named', async () => {
      const comeBackAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

      await service.log(
        's-1',
        {
          itemId: 'item-1',
          outcome: 'COME_BACK_LATER',
          comeBackAt: comeBackAt.toISOString(),
        },
        ME,
      );

      expect(tx.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          type: 'IN_PERSON',
          dueDate: comeBackAt,
          note: 'Come back later',
        }),
      });
    });

    it("rejects putting the lead back on the route if it's not later today", async () => {
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await expect(
        service.log(
          's-1',
          {
            itemId: 'item-1',
            outcome: 'COME_BACK_LATER',
            comeBackAt: nextWeek.toISOString(),
            addBackToRoute: true,
          },
          ME,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  it('suggests a stage change for "not a fit"', async () => {
    const result = await service.log(
      's-1',
      { itemId: 'item-1', outcome: 'NOT_A_FIT' },
      ME,
    );

    expect(result.suggestedStage).toBe('NOT_A_FIT');
  });

  it('suggests nothing for other results', async () => {
    const result = await service.log(
      's-1',
      { itemId: 'item-1', outcome: 'INTERESTED' },
      ME,
    );

    expect(result.suggestedStage).toBeNull();
  });
});
