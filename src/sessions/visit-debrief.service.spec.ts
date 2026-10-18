import {
  BadGatewayException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PitchrAiError, postToPitchrAi } from 'src/common/pitchr-ai';
import { teamDateKey } from 'src/common/team-time';
import { DatabaseService } from 'src/database/database.service';
import { SessionsService } from './sessions.service';
import { DebriefProposal, VisitDebriefService } from './visit-debrief.service';

// pitchr-ai is mocked: no real (paid) Claude calls.
jest.mock('src/common/pitchr-ai', () => ({
  ...jest.requireActual('src/common/pitchr-ai'),
  postToPitchrAi: jest.fn(),
}));
const pitchrAi = postToPitchrAi as jest.MockedFunction<typeof postToPitchrAi>;

const db = {
  sessionItem: { findUnique: jest.fn() },
  lead: { findUnique: jest.fn() },
  attachment: { count: jest.fn() },
  visitDebrief: { create: jest.fn() },
};
const sessions = { getEditable: jest.fn() };
const service = new VisitDebriefService(
  db as unknown as DatabaseService,
  sessions as unknown as SessionsService,
);
service.businessCardPollMs = 0;

const ME = { id: 'u-1', role: 'STAFF' };
const NOTE =
  'Spoke with Jen at the front desk. Owner is Maria, in on Thursdays.';

const LEAD = {
  id: 'lead-1',
  business: 'Lopez Med Spa',
  pipelineStage: 'CONTACTED',
  industry: { name: 'Aesthetics' },
  businessType: null,
  contacts: [
    {
      id: 'c-maria',
      firstName: 'María',
      lastName: 'López',
      title: 'Owner',
      isDecisionMaker: true,
    },
  ],
  touchPoint: [
    {
      date: new Date('2026-10-01T15:00:00Z'),
      type: 'IN_PERSON',
      summary: 'Owner not in',
    },
  ],
};

const PROPOSAL: DebriefProposal = {
  model: 'claude-haiku-5-5',
  outcome: 'DECISION_MAKER_NOT_AVAILABLE',
  providerType: null,
  comeBackDate: '2026-10-22',
  comeBackTime: null,
  comeBackEstimate: null,
  leftMaterials: true,
  summary: 'We spoke with Jen at the front desk.',
  people: [],
  questions: [],
};

describe('VisitDebriefService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessions.getEditable.mockResolvedValue({ id: 's-1' });
    db.sessionItem.findUnique.mockResolvedValue({
      sessionId: 's-1',
      leadId: 'lead-1',
    });
    db.lead.findUnique.mockResolvedValue(LEAD);
    db.attachment.count.mockResolvedValue(0);
    db.visitDebrief.create.mockResolvedValue({ id: 'd-1' });
    pitchrAi.mockResolvedValue(PROPOSAL);
  });

  it('sends the note with the lead, its contacts and latest touchpoints, and saves the proposal', async () => {
    const result = await service.debrief(
      's-1',
      { itemId: 'item-1', note: `  ${NOTE}  ` },
      ME,
    );

    const [path, body, timeout] = pitchrAi.mock.calls[0];
    expect(path).toBe('/visits/debrief');
    expect(body).toEqual({
      today: teamDateKey(),
      note: NOTE,
      lead: {
        business: 'Lopez Med Spa',
        industry: 'Aesthetics',
        businessType: null,
        pipelineStage: 'CONTACTED',
      },
      contacts: LEAD.contacts,
      recentTouchpoints: LEAD.touchPoint,
    });
    // Fail fast: this is used standing on a sidewalk
    expect(timeout).toBe(30_000);
    expect(db.visitDebrief.create).toHaveBeenCalledWith({
      data: {
        note: NOTE,
        proposal: PROPOSAL,
        model: 'claude-haiku-5-5',
        sessionId: 's-1',
        leadId: 'lead-1',
        userId: 'u-1',
      },
    });
    expect(result).toEqual({ debriefId: 'd-1', proposal: PROPOSAL });
  });

  it('works for an unplanned lead too', async () => {
    db.lead.findUnique
      .mockResolvedValueOnce({ id: 'lead-2' })
      .mockResolvedValueOnce({ ...LEAD, id: 'lead-2' });

    await service.debrief('s-1', { leadId: 'lead-2', note: NOTE }, ME);

    expect(db.visitDebrief.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ leadId: 'lead-2' }),
    });
  });

  it('waits for a business card still being read', async () => {
    db.attachment.count
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(0);

    await service.debrief('s-1', { itemId: 'item-1', note: NOTE }, ME);

    expect(db.attachment.count).toHaveBeenCalledTimes(3);
    expect(db.attachment.count).toHaveBeenCalledWith({
      where: { leadId: 'lead-1', businessCardScan: 'PENDING' },
    });
    // The lead (and its contacts) are loaded after the wait
    expect(db.lead.findUnique.mock.invocationCallOrder[0]).toBeGreaterThan(
      db.attachment.count.mock.invocationCallOrder[2],
    );
  });

  it('says so when pitchr-ai fails, and saves nothing', async () => {
    pitchrAi.mockRejectedValue(new PitchrAiError('pitchr-ai returned 502'));

    await expect(
      service.debrief('s-1', { itemId: 'item-1', note: NOTE }, ME),
    ).rejects.toThrow(BadGatewayException);
    expect(db.visitDebrief.create).not.toHaveBeenCalled();
  });

  it('needs a note, and exactly one of itemId or leadId', async () => {
    await expect(
      service.debrief('s-1', { itemId: 'item-1', note: '   ' }, ME),
    ).rejects.toThrow(BadRequestException);
    await expect(
      service.debrief(
        's-1',
        { itemId: 'item-1', leadId: 'lead-1', note: NOTE },
        ME,
      ),
    ).rejects.toThrow(BadRequestException);
    await expect(service.debrief('s-1', { note: NOTE }, ME)).rejects.toThrow(
      BadRequestException,
    );
    expect(pitchrAi).not.toHaveBeenCalled();
  });

  it('refuses an item from another session', async () => {
    db.sessionItem.findUnique.mockResolvedValue({
      sessionId: 's-other',
      leadId: 'lead-1',
    });

    await expect(
      service.debrief('s-1', { itemId: 'item-1', note: NOTE }, ME),
    ).rejects.toThrow(NotFoundException);
  });

  it("checks the session is the user's to edit", async () => {
    sessions.getEditable.mockRejectedValue(new NotFoundException());

    await expect(
      service.debrief('s-1', { itemId: 'item-1', note: NOTE }, ME),
    ).rejects.toThrow(NotFoundException);
    expect(pitchrAi).not.toHaveBeenCalled();
  });
});
