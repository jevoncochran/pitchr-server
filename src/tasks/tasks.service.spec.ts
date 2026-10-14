import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import { teamDateKey } from 'src/common/team-time';
import { TasksService } from './tasks.service';

// A fake database; $transaction runs the callback with the same fake
const tx = {
  task: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  },
  touchPoint: { findUnique: jest.fn(), update: jest.fn() },
  lead: { findUnique: jest.fn(), update: jest.fn() },
  leadStageChange: { create: jest.fn() },
};
const mockDb = {
  $transaction: jest.fn((callback: (t: typeof tx) => unknown) => callback(tx)),
};

const LEAD = {
  id: 'lead-1',
  sequenceStep: 2,
  sequenceActive: true,
  pipelineStage: 'CONTACTED',
};
const EMAIL = { id: 'tp-1', type: 'EMAIL', delivery: 'SENT' };
const REPLY = 'Thanks! What do you charge for a 60-second reel?';

const checkIn = (overrides = {}) => ({
  id: 'task-1',
  isCheckIn: true,
  isEmailSentCheck: false,
  isResponseCheck: false,
  touchPointId: 'tp-1',
  lead: LEAD,
  touchPoint: EMAIL,
  ...overrides,
});

describe('TasksService check-ins and replies', () => {
  let service: TasksService;

  beforeEach(async () => {
    jest.clearAllMocks();
    tx.task.findUnique.mockResolvedValue(checkIn());
    tx.touchPoint.findUnique.mockResolvedValue(EMAIL);

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, { provide: DatabaseService, useValue: mockDb }],
    }).compile();
    service = module.get(TasksService);
  });

  it('"yes" saves their reply and when on the email', async () => {
    await service.respond('task-1', true, {
      responseText: ` ${REPLY} `,
      respondedOn: '2026-10-10',
    });

    expect(tx.touchPoint.update).toHaveBeenCalledWith({
      where: { id: 'tp-1' },
      data: {
        response: 'REPLIED',
        responseText: REPLY,
        respondedOn: new Date('2026-10-10T00:00:00Z'),
        receivedResponse: true,
      },
    });
  });

  it('the reply date defaults to today', async () => {
    await service.respond('task-1', true, { responseText: REPLY });

    expect(tx.touchPoint.update).toHaveBeenCalledWith({
      where: { id: 'tp-1' },
      data: expect.objectContaining({
        respondedOn: new Date(`${teamDateKey()}T00:00:00Z`),
      }),
    });
  });

  it('"no" saves No response on the email', async () => {
    await service.respond('task-1', false);

    expect(tx.touchPoint.update).toHaveBeenCalledWith({
      where: { id: 'tp-1' },
      data: {
        response: 'NO_RESPONSE',
        responseText: null,
        respondedOn: null,
        receivedResponse: false,
      },
    });
  });

  it('"yes" needs their reply', async () => {
    await expect(service.respond('task-1', true)).rejects.toThrow(
      BadRequestException,
    );
    await expect(
      service.respond('task-1', true, { responseText: '   ' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects a reply date in the future', async () => {
    await expect(
      service.respond('task-1', true, {
        responseText: REPLY,
        respondedOn: '2999-01-01',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('still moves the sequence along as before', async () => {
    await service.respond('task-1', true, { responseText: REPLY });

    expect(tx.lead.update).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
      data: { sequenceStep: 1 },
    });
    expect(tx.task.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        note: 'Did they respond to your reply?',
      }),
    });
  });

  it("doesn't touch any message for a check-in that isn't about one", async () => {
    tx.task.findUnique.mockResolvedValue(
      checkIn({ touchPointId: null, touchPoint: null, isResponseCheck: true }),
    );

    await service.respond('task-1', true);

    expect(tx.touchPoint.update).not.toHaveBeenCalled();
  });

  describe('recording a reply anytime', () => {
    it('answers the open check-in for that message, so it is not asked again', async () => {
      tx.task.findFirst.mockResolvedValue({ id: 'task-1' });

      await service.recordReply('tp-1', { responseText: REPLY });

      expect(tx.task.update).toHaveBeenCalledWith({
        where: { id: 'task-1' },
        data: expect.objectContaining({ completed: true }),
      });
      expect(tx.touchPoint.update).toHaveBeenCalled();
    });

    it('just saves the reply when there is no open check-in', async () => {
      tx.task.findFirst.mockResolvedValue(null);

      await service.recordReply('tp-1', { responseText: REPLY });

      expect(tx.task.update).not.toHaveBeenCalled();
      expect(tx.touchPoint.update).toHaveBeenCalledWith({
        where: { id: 'tp-1' },
        data: expect.objectContaining({
          response: 'REPLIED',
          responseText: REPLY,
        }),
      });
    });

    it('rejects replies on visits and calls, and on failed messages', async () => {
      tx.task.findFirst.mockResolvedValue(null);

      tx.touchPoint.findUnique.mockResolvedValue({ ...EMAIL, type: 'CALL' });
      await expect(
        service.recordReply('tp-1', { responseText: REPLY }),
      ).rejects.toThrow(BadRequestException);

      tx.touchPoint.findUnique.mockResolvedValue({
        ...EMAIL,
        delivery: 'FAILED',
      });
      await expect(
        service.recordReply('tp-1', { responseText: REPLY }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
