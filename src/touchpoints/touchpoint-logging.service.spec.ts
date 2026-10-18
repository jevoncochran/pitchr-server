import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TouchPointOutcome } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import {
  parseResults,
  TouchpointLoggingService,
} from './touchpoint-logging.service';

// A fake database. $transaction just runs the callback with the same fake,
// so the tests can check exactly which writes the service makes.
const tx = {
  lead: { findUnique: jest.fn(), update: jest.fn() },
  touchPoint: { create: jest.fn() },
  task: { create: jest.fn(), update: jest.fn(), findFirst: jest.fn() },
};
const mockDb = {
  $transaction: jest.fn((callback: (t: typeof tx) => unknown) => callback(tx)),
};

const USER_ID = 'user-1';
const TOUCHPOINT = { id: 'tp-1' };

const lead = (overrides = {}) => ({
  id: 'lead-1',
  sequenceActive: false,
  sequenceStep: 0,
  ...overrides,
});

const input = (overrides = {}) => ({
  leadId: 'lead-1',
  date: '2026-10-14T15:00:00.000Z',
  type: 'IN_PERSON' as const,
  ...overrides,
});

describe('TouchpointLoggingService', () => {
  let service: TouchpointLoggingService;

  beforeEach(async () => {
    jest.clearAllMocks();
    tx.touchPoint.create.mockResolvedValue(TOUCHPOINT);
    tx.task.findFirst.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TouchpointLoggingService,
        { provide: DatabaseService, useValue: mockDb },
      ],
    }).compile();
    service = module.get(TouchpointLoggingService);
  });

  it('saves the touchpoint, recording the logged-in user and contacts', async () => {
    tx.lead.findUnique.mockResolvedValue(lead());

    const result = await service.logTouchpoint(
      input({ type: 'CALL', summary: 'Left a message', contactIds: ['c-1'] }),
      USER_ID,
    );

    expect(result).toBe(TOUCHPOINT);
    expect(tx.touchPoint.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        type: 'CALL',
        summary: 'Left a message',
        contactedBy: { connect: { id: USER_ID } },
        contacts: { connect: [{ id: 'c-1' }] },
      }),
    });
  });

  it('runs everything inside one transaction', async () => {
    tx.lead.findUnique.mockResolvedValue(lead());

    await service.logTouchpoint(input(), USER_ID);

    expect(mockDb.$transaction).toHaveBeenCalledTimes(1);
  });

  describe('in-person visit', () => {
    it('starts the sequence and creates the "did you send the follow-up email?" task', async () => {
      tx.lead.findUnique.mockResolvedValue(lead({ sequenceActive: false }));

      await service.logTouchpoint(input({ type: 'IN_PERSON' }), USER_ID);

      expect(tx.lead.update).toHaveBeenCalledWith({
        where: { id: 'lead-1' },
        data: { sequenceActive: true },
      });
      expect(tx.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          note: 'Did you send the follow-up email?',
          isEmailSentCheck: true,
          touchPoint: { connect: { id: 'tp-1' } },
        }),
      });
    });

    it("doesn't restart a sequence that's already running", async () => {
      tx.lead.findUnique.mockResolvedValue(lead({ sequenceActive: true }));

      await service.logTouchpoint(input({ type: 'IN_PERSON' }), USER_ID);

      expect(tx.lead.update).not.toHaveBeenCalled();
      expect(tx.task.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('email', () => {
    it('advances the sequence, completes the pending email check and creates a 4-day check-in', async () => {
      tx.lead.findUnique.mockResolvedValue(
        lead({ sequenceActive: true, sequenceStep: 1 }),
      );
      tx.task.findFirst.mockResolvedValue({ id: 'email-check-1' });

      await service.logTouchpoint(input({ type: 'EMAIL' }), USER_ID);

      expect(tx.task.update).toHaveBeenCalledWith({
        where: { id: 'email-check-1' },
        data: expect.objectContaining({ completed: true }),
      });
      expect(tx.lead.update).toHaveBeenCalledWith({
        where: { id: 'lead-1' },
        data: { sequenceStep: 2 },
      });
      expect(tx.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          note: 'Did they respond to outreach A2?',
          isCheckIn: true,
          dueDate: new Date('2026-10-18T15:00:00.000Z'), // 4 days after the email
        }),
      });
    });

    it('does nothing extra when the sequence is not running', async () => {
      tx.lead.findUnique.mockResolvedValue(lead({ sequenceActive: false }));

      await service.logTouchpoint(input({ type: 'EMAIL' }), USER_ID);

      expect(tx.lead.update).not.toHaveBeenCalled();
      expect(tx.task.create).not.toHaveBeenCalled();
    });
  });

  it('a visit attempt only saves the touchpoint', async () => {
    tx.lead.findUnique.mockResolvedValue(lead({ sequenceActive: true }));

    await service.logTouchpoint(input({ type: 'VISIT_ATTEMPT' }), USER_ID);

    expect(tx.touchPoint.create).toHaveBeenCalledTimes(1);
    expect(tx.lead.update).not.toHaveBeenCalled();
    expect(tx.task.create).not.toHaveBeenCalled();
    expect(tx.task.update).not.toHaveBeenCalled();
  });

  it('completes the task it was logged from', async () => {
    tx.lead.findUnique.mockResolvedValue(lead());

    await service.logTouchpoint(
      input({ type: 'CALL', completingTaskId: 'task-9' }),
      USER_ID,
    );

    expect(tx.task.update).toHaveBeenCalledWith({
      where: { id: 'task-9' },
      data: expect.objectContaining({ completed: true }),
    });
  });

  it('rejects a lead that does not exist', async () => {
    tx.lead.findUnique.mockResolvedValue(null);

    await expect(service.logTouchpoint(input(), USER_ID)).rejects.toThrow(
      NotFoundException,
    );
    expect(tx.touchPoint.create).not.toHaveBeenCalled();
  });

  it('rejects an unknown touchpoint type or an invalid date', async () => {
    await expect(
      service.logTouchpoint(
        input({ type: 'CARRIER_PIGEON' as never }),
        USER_ID,
      ),
    ).rejects.toThrow(BadRequestException);
    await expect(
      service.logTouchpoint(input({ date: 'not-a-date' }), USER_ID),
    ).rejects.toThrow(BadRequestException);
    expect(mockDb.$transaction).not.toHaveBeenCalled();
  });
});

describe('parseResults (outcomes, delivery and responses)', () => {
  const base = { leadId: 'lead-1', date: '2026-10-14T15:00:00.000Z' };

  it('messages default to sent and waiting for a reply', () => {
    const r = parseResults({ ...base, type: 'INSTAGRAM_DM' });
    expect(r.delivery).toBe('SENT');
    expect(r.response).toBe('PENDING');
    expect(r.receivedResponse).toBe(false);
  });

  it('a message logged as already answered is replied, with its text', () => {
    const r = parseResults({
      ...base,
      type: 'INSTAGRAM_DM',
      receivedResponse: true,
      responseText: ' Sounds good! ',
    });
    expect(r.response).toBe('REPLIED');
    expect(r.responseText).toBe('Sounds good!');
    expect(r.receivedResponse).toBe(true);
    expect(r.respondedOn).toBeInstanceOf(Date);
  });

  it('reply text only goes with a reply', () => {
    expect(() =>
      parseResults({ ...base, type: 'EMAIL', responseText: 'hello' }),
    ).toThrow(BadRequestException);
  });

  it('a failed message has no response', () => {
    const r = parseResults({ ...base, type: 'EMAIL', delivery: 'FAILED' });
    expect(r.response).toBeNull();
    expect(() =>
      parseResults({
        ...base,
        type: 'EMAIL',
        delivery: 'FAILED',
        response: 'REPLIED',
      }),
    ).toThrow(BadRequestException);
  });

  it('an in-person visit to a closed business is saved as a visit attempt', () => {
    const r = parseResults({
      ...base,
      type: 'IN_PERSON',
      outcome: 'BUSINESS_CLOSED',
    });
    expect(r.type).toBe('VISIT_ATTEMPT');
    expect(r.receivedResponse).toBe(false);
  });

  it('keeps outcomes for visits and calls, delivery and responses for messages', () => {
    expect(() =>
      parseResults({ ...base, type: 'EMAIL', outcome: 'INTERESTED' }),
    ).toThrow(BadRequestException);
    expect(() =>
      parseResults({ ...base, type: 'CALL', response: 'REPLIED' }),
    ).toThrow(BadRequestException);
    expect(() =>
      parseResults({ ...base, type: 'IN_PERSON', outcome: 'NO_ANSWER' }),
    ).toThrow(BadRequestException);
  });

  it('a conversation outcome marks receivedResponse; no answer does not', () => {
    expect(
      parseResults({ ...base, type: 'CALL', outcome: 'INTERESTED' })
        .receivedResponse,
    ).toBe(true);
    expect(
      parseResults({ ...base, type: 'CALL', outcome: 'NO_ANSWER' })
        .receivedResponse,
    ).toBe(false);
  });

  it('"has a provider" defaults to an unknown provider type', () => {
    expect(
      parseResults({ ...base, type: 'IN_PERSON', outcome: 'HAS_PROVIDER' })
        .providerType,
    ).toBe('UNKNOWN');
    expect(() =>
      parseResults({
        ...base,
        type: 'IN_PERSON',
        outcome: 'INTERESTED',
        providerType: 'VIDEO',
      }),
    ).toThrow(BadRequestException);
  });

  it.each(['COME_BACK_LATER', 'INTERESTED', 'DECISION_MAKER_NOT_AVAILABLE'])(
    'comeBackAt goes with %s',
    (outcome) => {
      expect(
        parseResults({
          ...base,
          type: 'IN_PERSON',
          outcome: outcome as TouchPointOutcome,
          comeBackAt: '2026-10-14T19:00:00.000Z',
        }).comeBackAt,
      ).toEqual(new Date('2026-10-14T19:00:00.000Z'));
    },
  );

  it.each([
    'NOT_INTERESTED',
    'HAS_PROVIDER',
    'MEETING_BOOKED',
    'BUSINESS_CLOSED',
  ])('comeBackAt does not go with %s', (outcome) => {
    expect(() =>
      parseResults({
        ...base,
        type: 'IN_PERSON',
        outcome: outcome as TouchPointOutcome,
        comeBackAt: '2026-10-14T19:00:00.000Z',
      }),
    ).toThrow(BadRequestException);
  });
});

describe('a failed email', () => {
  it('does not advance the sequence or create a check-in', async () => {
    jest.clearAllMocks();
    tx.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      sequenceActive: true,
      sequenceStep: 1,
    });
    tx.touchPoint.create.mockResolvedValue({ id: 'tp-1' });
    const service = new TouchpointLoggingService(
      mockDb as unknown as DatabaseService,
    );

    await service.logTouchpoint(
      {
        leadId: 'lead-1',
        date: '2026-10-14T15:00:00.000Z',
        type: 'EMAIL',
        delivery: 'FAILED',
      },
      'user-1',
    );

    expect(tx.lead.update).not.toHaveBeenCalled();
    expect(tx.task.create).not.toHaveBeenCalled();
  });
});
