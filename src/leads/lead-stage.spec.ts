import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { changeStage, parseConvertedAt } from './lead-stage';
import { LeadsService } from './leads.service';

const tx = {
  lead: { findUnique: jest.fn(), update: jest.fn(), create: jest.fn() },
  leadStageChange: { create: jest.fn() },
};
const asTx = tx as unknown as Prisma.TransactionClient;
const mockDb = {
  $transaction: jest.fn((callback: (t: typeof tx) => unknown) => callback(tx)),
};

beforeEach(() => jest.clearAllMocks());

describe('changeStage', () => {
  it('records the change in the stage history', async () => {
    await changeStage(
      asTx,
      { id: 'lead-1', pipelineStage: 'NEW' },
      'CONTACTED',
      'user-1',
    );

    expect(tx.leadStageChange.create).toHaveBeenCalledWith({
      data: {
        leadId: 'lead-1',
        fromStage: 'NEW',
        toStage: 'CONTACTED',
        changedById: 'user-1',
      },
    });
  });

  it('sets the conversion date to now when converting without a date', async () => {
    const before = Date.now();

    const data = await changeStage(
      asTx,
      { id: 'lead-1', pipelineStage: 'ENGAGED' },
      'CONVERTED',
      'user-1',
    );

    expect(data.pipelineStage).toBe('CONVERTED');
    expect((data.convertedAt as Date).getTime()).toBeGreaterThanOrEqual(before);
  });

  it('uses the chosen date when a conversion is backdated', async () => {
    const paidOn = new Date('2026-09-30T12:00:00Z');

    const data = await changeStage(
      asTx,
      { id: 'lead-1', pipelineStage: 'PROPOSAL_SENT' },
      'CONVERTED',
      'user-1',
      paidOn,
    );

    expect(data.convertedAt).toBe(paidOn);
  });

  it('clears the conversion date when a lead leaves Converted', async () => {
    const data = await changeStage(
      asTx,
      { id: 'lead-1', pipelineStage: 'CONVERTED' },
      'ENGAGED',
      'user-1',
    );

    expect(data).toEqual({ pipelineStage: 'ENGAGED', convertedAt: null });
    expect(tx.leadStageChange.create).toHaveBeenCalled(); // history keeps it
  });

  it('does nothing when the stage is unchanged', async () => {
    const data = await changeStage(
      asTx,
      { id: 'lead-1', pipelineStage: 'ENGAGED' },
      'ENGAGED',
      'user-1',
    );

    expect(data).toEqual({});
    expect(tx.leadStageChange.create).not.toHaveBeenCalled();
  });

  it('records system changes with no user', async () => {
    await changeStage(
      asTx,
      { id: 'lead-1', pipelineStage: 'CONTACTED' },
      'DORMANT',
      null,
    );

    expect(tx.leadStageChange.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ toStage: 'DORMANT', changedById: null }),
    });
  });

  it('rejects an unknown stage', async () => {
    await expect(
      changeStage(
        asTx,
        { id: 'lead-1', pipelineStage: 'NEW' },
        'SIGNED_IN_BLOOD' as never,
        'user-1',
      ),
    ).rejects.toThrow(BadRequestException);
  });
});

describe('parseConvertedAt', () => {
  it('accepts a past date and rejects bad or future ones', () => {
    expect(parseConvertedAt(undefined)).toBeUndefined();
    expect(parseConvertedAt('2026-09-30T12:00:00Z')).toEqual(
      new Date('2026-09-30T12:00:00Z'),
    );
    expect(() => parseConvertedAt('not-a-date')).toThrow(BadRequestException);
    expect(() => parseConvertedAt('2999-01-01T00:00:00Z')).toThrow(
      BadRequestException,
    );
  });
});

describe('LeadsService stage changes', () => {
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadsService, { provide: DatabaseService, useValue: mockDb }],
    }).compile();
    service = module.get(LeadsService);
  });

  it('a stage change through the normal update goes through the rules', async () => {
    tx.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      pipelineStage: 'ENGAGED',
    });

    await service.update(
      'lead-1',
      { pipelineStage: 'CONVERTED', convertedAt: '2026-10-01T12:00:00Z' },
      'user-1',
    );

    expect(tx.leadStageChange.create).toHaveBeenCalled();
    expect(tx.lead.update).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
      data: {
        pipelineStage: 'CONVERTED',
        convertedAt: new Date('2026-10-01T12:00:00Z'),
      },
    });
  });

  it('edits the conversion date of a lead that is already converted', async () => {
    tx.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      pipelineStage: 'CONVERTED',
    });

    await service.update(
      'lead-1',
      { convertedAt: '2026-09-15T12:00:00Z' },
      'user-1',
    );

    expect(tx.leadStageChange.create).not.toHaveBeenCalled();
    expect(tx.lead.update).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
      data: { convertedAt: new Date('2026-09-15T12:00:00Z') },
    });
  });

  it("won't set a conversion date on a lead that isn't converted", async () => {
    tx.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      pipelineStage: 'ENGAGED',
    });

    await expect(
      service.update(
        'lead-1',
        { convertedAt: '2026-09-15T12:00:00Z' },
        'user-1',
      ),
    ).rejects.toThrow(BadRequestException);
    expect(tx.lead.update).not.toHaveBeenCalled();
  });

  it("won't clear a conversion date directly", async () => {
    await expect(
      service.update('lead-1', { convertedAt: null }, 'user-1'),
    ).rejects.toThrow(BadRequestException);
  });

  it('updates other fields without touching the stage history', async () => {
    tx.lead.findUnique.mockResolvedValue({
      id: 'lead-1',
      pipelineStage: 'ENGAGED',
    });

    await service.update('lead-1', { isHot: true }, 'user-1');

    expect(tx.leadStageChange.create).not.toHaveBeenCalled();
    expect(tx.lead.update).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
      data: { isHot: true },
    });
  });

  it('returns 404 for a lead that does not exist', async () => {
    tx.lead.findUnique.mockResolvedValue(null);

    await expect(
      service.update('missing', { isHot: true }, 'user-1'),
    ).rejects.toThrow(NotFoundException);
  });

  it('a new lead starts its stage history', async () => {
    tx.lead.create.mockResolvedValue({ id: 'lead-9', pipelineStage: 'NEW' });

    await service.create(
      {
        business: 'Example Roofing',
        industry: { connect: { id: 'i-1' } },
        businessType: { connect: { id: 'b-1' } },
      },
      'user-1',
    );

    expect(tx.leadStageChange.create).toHaveBeenCalledWith({
      data: {
        leadId: 'lead-9',
        fromStage: null,
        toStage: 'NEW',
        changedById: 'user-1',
      },
    });
  });
});
