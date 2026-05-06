import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { DatabaseService } from 'src/database/database.service';

const mockDb = {
  lead: { findMany: jest.fn() },
  touchPoint: { findMany: jest.fn() },
};

describe('LeadsService', () => {
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadsService, { provide: DatabaseService, useValue: mockDb }],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    jest.clearAllMocks();
  });

  describe('findEstrangedLeads', () => {
    it('does not return a lead with multiple touchpoints when the most recent is 5 days ago', async () => {
      const lead = { id: 'lead-1', business: 'Acme Roofing' };

      mockDb.lead.findMany.mockResolvedValue([lead]);
      // Returned most-recent-first, matching the real DB's orderBy: { date: 'desc' }
      mockDb.touchPoint.findMany.mockResolvedValue([
        { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() },
        { date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString() },
        { date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString() },
        { date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString() },
      ]);

      const result = await service.findEstrangedLeads();

      expect(result).toHaveLength(0);
    });

    it('returns a lead with multiple touchpoints when the most recent is 10 days ago', async () => {
      const lead = { id: 'lead-1', business: 'Acme Roofing' };

      mockDb.lead.findMany.mockResolvedValue([lead]);
      // Returned most-recent-first, matching the real DB's orderBy: { date: 'desc' }
      mockDb.touchPoint.findMany.mockResolvedValue([
        { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
        { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
        { date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
      ]);

      const result = await service.findEstrangedLeads();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('lead-1');
    });

    it('returns a lead whose last touchpoint was exactly 7 days ago', async () => {
      const lead = { id: 'lead-1', business: 'Acme Roofing' };
      const exactlySevenDaysAgo = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString();

      mockDb.lead.findMany.mockResolvedValue([lead]);
      mockDb.touchPoint.findMany.mockResolvedValue([
        { date: exactlySevenDaysAgo },
      ]);

      const result = await service.findEstrangedLeads();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('lead-1');
    });

    it('returns only the one estranged lead out of three leads each with two touchpoints', async () => {
      const leads = [
        { id: 'lead-1', business: 'Acme Roofing' }, // most recent: 10 days ago — estranged
        { id: 'lead-2', business: 'Tampa Med Spa' }, // most recent: 3 days ago  — not estranged
        { id: 'lead-3', business: 'Gulf Coast Eats' }, // most recent: 5 days ago  — not estranged
      ];

      mockDb.lead.findMany.mockResolvedValue(leads);
      mockDb.touchPoint.findMany.mockImplementation(({ where }) => {
        if (where.leadId === 'lead-1') {
          return Promise.resolve([
            {
              date: new Date(
                Date.now() - 10 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
            {
              date: new Date(
                Date.now() - 20 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
          ]);
        }
        if (where.leadId === 'lead-2') {
          return Promise.resolve([
            {
              date: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
            {
              date: new Date(
                Date.now() - 14 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
          ]);
        }
        if (where.leadId === 'lead-3') {
          return Promise.resolve([
            {
              date: new Date(
                Date.now() - 5 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
            {
              date: new Date(
                Date.now() - 12 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
          ]);
        }
        return Promise.resolve([]);
      });

      const result = await service.findEstrangedLeads();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('lead-1');
    });

    it('does not return a lead with no touchpoints', async () => {
      const lead = { id: 'lead-1', business: 'Acme Roofing' };
      mockDb.lead.findMany.mockResolvedValue([lead]);
      mockDb.touchPoint.findMany.mockResolvedValue([]);

      const result = await service.findEstrangedLeads();

      expect(result).toHaveLength(0);
    });
  });
});
