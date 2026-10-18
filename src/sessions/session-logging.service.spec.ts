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
  contact: {
    count: jest.fn(),
    create: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
  },
  contactChangeSuggestion: { upsert: jest.fn() },
  visitDebrief: { updateMany: jest.fn() },
  attachment: { updateMany: jest.fn() },
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
          origin: 'APPROACHED_US',
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
        origin: 'APPROACHED_US',
        originOther: null,
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

  it('a quick-added business can be saved without an industry or business type', async () => {
    tx.lead.create.mockResolvedValue({ id: 'lead-new', pipelineStage: 'NEW' });

    await service.log(
      's-1',
      { newLead: { business: 'La Unión Hall' }, outcome: 'INTERESTED' },
      ME,
    );

    expect(tx.lead.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        business: 'La Unión Hall',
        industryId: null,
        businessTypeId: null,
      }),
    });
  });

  it('a quick-added business can be saved without an origin', async () => {
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
      data: expect.objectContaining({ origin: null }),
    });
  });

  it('rejects an unknown origin before saving anything', async () => {
    await expect(
      service.log(
        's-1',
        {
          newLead: {
            business: 'Bay Roofing',
            industryId: 'i-1',
            businessTypeId: 'b-1',
            origin: 'OUTREACH' as never,
          },
          outcome: 'INTERESTED',
        },
        ME,
      ),
    ).rejects.toThrow(BadRequestException);
    expect(tx.lead.create).not.toHaveBeenCalled();
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

  describe('from a visit debrief (docs/visit-debrief.md)', () => {
    beforeEach(() => {
      let created = 0;
      tx.contact.create.mockImplementation(() =>
        Promise.resolve({ id: `c-new-${++created}` }),
      );
      tx.contact.count.mockImplementation(
        (args: { where: { id: { in: string[] } } }) =>
          Promise.resolve(args.where.id.in.length),
      );
      tx.visitDebrief.updateMany.mockResolvedValue({ count: 1 });
    });

    it('adds several new contacts, counting only the ones we spoke with', async () => {
      await service.log(
        's-1',
        {
          itemId: 'item-1',
          outcome: 'DECISION_MAKER_NOT_AVAILABLE',
          newContacts: [
            { firstName: 'Jen', title: 'front desk', spokeWith: true },
            {
              firstName: 'Lisa',
              title: 'owner',
              isDecisionMaker: true,
              spokeWith: false,
            },
          ],
        },
        ME,
      );

      expect(tx.contact.create).toHaveBeenCalledTimes(2);
      expect(tx.contact.create).toHaveBeenLastCalledWith({
        data: expect.objectContaining({
          firstName: 'Lisa',
          isDecisionMaker: true,
          leadId: 'lead-1',
        }),
      });
      expect(mockTouchpointLogging.logWithin).toHaveBeenCalledWith(
        tx,
        expect.objectContaining({ contactIds: ['c-new-1'] }),
        ME.id,
        expect.anything(),
      );
    });

    it('fills in an empty title, suggests a different one, and only turns decision-maker on', async () => {
      tx.contact.findUniqueOrThrow
        .mockResolvedValueOnce({ title: null, isDecisionMaker: false })
        .mockResolvedValueOnce({
          title: 'Office manager',
          isDecisionMaker: true,
        })
        .mockResolvedValueOnce({ title: 'OWNER', isDecisionMaker: true });

      await service.log(
        's-1',
        {
          itemId: 'item-1',
          outcome: 'INTERESTED',
          contactUpdates: [
            { contactId: 'c-maria', title: 'Owner', isDecisionMaker: true },
            {
              contactId: 'c-jen',
              title: 'Practice manager',
              isDecisionMaker: false,
            },
            { contactId: 'c-ana', title: 'owner' },
          ],
        },
        ME,
      );

      expect(tx.contact.update).toHaveBeenCalledTimes(1);
      expect(tx.contact.update).toHaveBeenCalledWith({
        where: { id: 'c-maria' },
        data: { title: 'Owner', isDecisionMaker: true },
      });
      // A different title is a Replace/Keep suggestion; the same one in other case isn't
      expect(tx.contactChangeSuggestion.upsert).toHaveBeenCalledTimes(1);
      expect(tx.contactChangeSuggestion.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: {
            contactId: 'c-jen',
            field: 'title',
            currentValue: 'Office manager',
            suggestedValue: 'Practice manager',
          },
        }),
      );
    });

    it("refuses an update to a contact that isn't the lead's", async () => {
      tx.contact.count.mockResolvedValue(0);

      await expect(
        service.log(
          's-1',
          {
            itemId: 'item-1',
            outcome: 'INTERESTED',
            contactUpdates: [{ contactId: 'c-other', title: 'Owner' }],
          },
          ME,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('links the debrief to the touchpoint', async () => {
      await service.log(
        's-1',
        { itemId: 'item-1', outcome: 'INTERESTED', debriefId: 'd-1' },
        ME,
      );

      expect(tx.visitDebrief.updateMany).toHaveBeenCalledWith({
        where: {
          id: 'd-1',
          sessionId: 's-1',
          leadId: 'lead-1',
          touchPointId: null,
        },
        data: { touchPointId: 'tp-1' },
      });
    });

    it('refuses a debrief from another visit', async () => {
      tx.visitDebrief.updateMany.mockResolvedValue({ count: 0 });

      await expect(
        service.log(
          's-1',
          { itemId: 'item-1', outcome: 'INTERESTED', debriefId: 'd-other' },
          ME,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("a visit's photos", () => {
    it("go with the touchpoint: the lead's photos from this session not on one yet", async () => {
      const startedAt = new Date('2026-10-17T13:00:00Z');
      mockSessions.getEditable.mockResolvedValue(session({ startedAt }));

      await service.log('s-1', { itemId: 'item-1', outcome: 'INTERESTED' }, ME);

      expect(tx.attachment.updateMany).toHaveBeenCalledWith({
        where: {
          leadId: 'lead-1',
          touchpointId: null,
          createdAt: { gte: startedAt },
        },
        data: { touchpointId: 'tp-1' },
      });
    });

    it('stay where they are for a call', async () => {
      mockSessions.getEditable.mockResolvedValue(session({ channel: 'CALL' }));

      await service.log('s-1', { itemId: 'item-1', outcome: 'INTERESTED' }, ME);

      expect(tx.attachment.updateMany).not.toHaveBeenCalled();
    });
  });
});
