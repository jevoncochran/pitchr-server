import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BusinessCardScanStatus, Prisma } from '@prisma/client';
import { PitchrAiError, postToPitchrAi } from 'src/common/pitchr-ai';
import { teamDateKey } from 'src/common/team-time';
import { DatabaseService } from 'src/database/database.service';
import { SessionsService, SessionUser } from './sessions.service';

// Fill in is used standing on a sidewalk between stops: fail fast and let the
// owner try again or fill in the form by hand
const DEBRIEF_TIMEOUT_MS = 30_000;

// A business card photographed a moment ago may still be being read; wait for
// it (up to this long) so the person on it is already a contact
const BUSINESS_CARD_WAIT_MS = 20_000;

const MAX_NOTE_LENGTH = 5000;

/** What the visit form sends with "Fill in". */
export interface DebriefInput {
  // One of these says which lead:
  /** A planned item on the session's list */
  itemId?: string;
  /** An existing lead that wasn't planned */
  leadId?: string;
  /** The note, as dictated */
  note: string;
}

/** One person the note mentions (Person in pitchr-ai). */
export interface DebriefPerson {
  contactId: string | null;
  candidateContactIds: string[];
  firstName: string | null;
  lastName: string | null;
  title: string | null;
  isDecisionMaker: boolean | null;
  spokeWith: boolean;
}

/** pitchr-ai's proposal for the visit form (VisitDebriefResponse in pitchr-ai). */
export interface DebriefProposal {
  model: string | null;
  outcome: string | null;
  providerType: string | null;
  comeBackDate: string | null;
  comeBackTime: string | null;
  /** The words the date or time was estimated from ("next week"); null when said exactly */
  comeBackEstimate: string | null;
  leftMaterials: boolean;
  summary: string;
  people: DebriefPerson[];
  questions: string[];
}

const DEBRIEF_LEAD = {
  industry: { select: { name: true } },
  businessType: { select: { name: true } },
  contacts: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      title: true,
      isDecisionMaker: true,
    },
  },
  touchPoint: {
    orderBy: { date: 'desc' },
    take: 3,
    select: { date: true, type: true, summary: true },
  },
} satisfies Prisma.LeadInclude;

/**
 * The visit debrief (docs/visit-debrief.md): a note dictated after a visit
 * becomes a proposal for the visit form. Nothing on the lead changes here; the
 * note and proposal are saved as a VisitDebrief, linked to the touchpoint when
 * the visit is logged from it.
 */
@Injectable()
export class VisitDebriefService {
  private readonly logger = new Logger(VisitDebriefService.name);

  /** How often to check on business cards being read (tests set it to 0) */
  businessCardPollMs = 1000;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly sessionsService: SessionsService,
  ) {}

  async debrief(sessionId: string, input: DebriefInput, user: SessionUser) {
    await this.sessionsService.getEditable(sessionId, user);
    const note = input.note?.trim();
    if (!note) throw new BadRequestException('Say what happened first');
    if (note.length > MAX_NOTE_LENGTH) {
      throw new BadRequestException(
        `Keep the note under ${MAX_NOTE_LENGTH} characters`,
      );
    }
    const leadId = await this.findLeadId(sessionId, input);

    await this.waitForBusinessCards(leadId);
    const lead = await this.databaseService.lead.findUnique({
      where: { id: leadId },
      include: DEBRIEF_LEAD,
    });
    if (!lead) throw new NotFoundException('Lead not found');

    let proposal: DebriefProposal;
    try {
      proposal = await postToPitchrAi<DebriefProposal>(
        '/visits/debrief',
        {
          today: teamDateKey(),
          note,
          lead: {
            business: lead.business,
            industry: lead.industry?.name ?? null,
            businessType: lead.businessType?.name ?? null,
            pipelineStage: lead.pipelineStage,
          },
          contacts: lead.contacts,
          recentTouchpoints: lead.touchPoint,
        },
        DEBRIEF_TIMEOUT_MS,
      );
    } catch (error) {
      if (!(error instanceof PitchrAiError)) throw error;
      this.logger.error(`Visit debrief failed: ${error.message}`);
      throw new BadGatewayException(
        "Couldn't fill in the form. Try again or fill it in yourself.",
      );
    }

    const debrief = await this.databaseService.visitDebrief.create({
      data: {
        note,
        proposal: proposal as unknown as Prisma.InputJsonValue,
        model: proposal.model ?? 'unknown',
        sessionId,
        leadId,
        userId: user.id,
      },
    });
    return { debriefId: debrief.id, proposal };
  }

  /** The lead of a planned item on this session, or an existing lead. */
  private async findLeadId(sessionId: string, input: DebriefInput) {
    if (!!input.itemId === !!input.leadId) {
      throw new BadRequestException('Send exactly one of itemId or leadId');
    }
    if (input.itemId) {
      const item = await this.databaseService.sessionItem.findUnique({
        where: { id: input.itemId },
        select: { sessionId: true, leadId: true },
      });
      if (!item || item.sessionId !== sessionId) {
        throw new NotFoundException('Item not found in this session');
      }
      return item.leadId;
    }
    const lead = await this.databaseService.lead.findUnique({
      where: { id: input.leadId },
      select: { id: true },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead.id;
  }

  /** Wait (up to BUSINESS_CARD_WAIT_MS) for the lead's business cards still being read. */
  private async waitForBusinessCards(leadId: string) {
    const deadline = Date.now() + BUSINESS_CARD_WAIT_MS;
    for (;;) {
      const reading = await this.databaseService.attachment.count({
        where: { leadId, businessCardScan: BusinessCardScanStatus.PENDING },
      });
      if (reading === 0 || Date.now() >= deadline) return;
      await new Promise((resolve) =>
        setTimeout(resolve, this.businessCardPollMs),
      );
    }
  }
}
