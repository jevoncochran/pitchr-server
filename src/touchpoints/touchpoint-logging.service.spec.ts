import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { TouchpointLoggingService } from './touchpoint-logging.service';

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
