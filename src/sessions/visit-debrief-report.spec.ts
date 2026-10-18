import {
  compareDebrief,
  LoggedVisit,
  similarity,
} from './visit-debrief-report';
import type { DebriefProposal } from './visit-debrief.service';

const proposal = (over: Partial<DebriefProposal> = {}): DebriefProposal => ({
  model: 'claude-haiku-5-5',
  outcome: 'DECISION_MAKER_NOT_AVAILABLE',
  providerType: null,
  comeBackDate: '2026-10-22',
  comeBackTime: null,
  comeBackEstimate: null,
  leftMaterials: true,
  summary:
    'We spoke with Jen at the front desk. The owner, María, is only in on Thursdays.',
  people: [
    {
      contactId: null,
      candidateContactIds: [],
      firstName: 'Jen',
      lastName: null,
      title: 'front desk',
      isDecisionMaker: false,
      spokeWith: true,
    },
    {
      contactId: 'c-maria',
      candidateContactIds: [],
      firstName: 'María',
      lastName: 'López',
      title: 'owner',
      isDecisionMaker: true,
      spokeWith: false,
    },
  ],
  questions: [],
  ...over,
});

// 9:00 in Tampa on 10/22 (the form's time when none was given)
const logged = (over: Partial<LoggedVisit> = {}): LoggedVisit => ({
  outcome: 'DECISION_MAKER_NOT_AVAILABLE',
  providerType: null,
  comeBackAt: new Date('2026-10-22T13:00:00Z'),
  leftMaterials: true,
  summary:
    'We spoke with Jen at the front desk. The owner, María, is only in on Thursdays.',
  contacts: [{ firstName: 'Jen', lastName: null }],
  ...over,
});

const fixed = (checks: ReturnType<typeof compareDebrief>) =>
  checks.filter((c) => c.fixed).map((c) => c.field);

describe('compareDebrief', () => {
  it('finds nothing fixed when the visit was logged as proposed', () => {
    expect(fixed(compareDebrief(proposal(), logged()))).toEqual([]);
  });

  it('finds each field that was changed, with what it was and what it became', () => {
    const checks = compareDebrief(
      proposal(),
      logged({
        outcome: 'INTERESTED',
        comeBackAt: new Date('2026-10-23T13:00:00Z'),
        leftMaterials: false,
        contacts: [
          { firstName: 'Jen', lastName: null },
          { firstName: 'Maria', lastName: 'Lopez' },
        ],
        summary: 'Jen said to email the owner.',
      }),
    );

    expect(fixed(checks)).toEqual([
      'outcome',
      'comeBack',
      'leftMaterials',
      'people',
      'summary',
    ]);
    expect(checks.find((c) => c.field === 'outcome')?.detail).toBe(
      'DECISION_MAKER_NOT_AVAILABLE → INTERESTED',
    );
    expect(checks.find((c) => c.field === 'comeBack')?.detail).toBe(
      '2026-10-22 → 2026-10-23',
    );
  });

  it('compares the come-back time only when one was proposed', () => {
    const at3 = proposal({ comeBackDate: '2026-10-16', comeBackTime: '15:00' });
    // 3pm in Tampa (EDT) is 19:00 UTC
    expect(
      fixed(
        compareDebrief(
          at3,
          logged({ comeBackAt: new Date('2026-10-16T19:00:00Z') }),
        ),
      ),
    ).toEqual([]);
    expect(
      compareDebrief(
        at3,
        logged({ comeBackAt: new Date('2026-10-16T20:30:00Z') }),
      ).find((c) => c.field === 'comeBack')?.detail,
    ).toBe('2026-10-16 15:00 → 2026-10-16 16:30');
  });

  it('checks the provider only for visits logged as "has a provider"', () => {
    const fields = (outcome: string) =>
      compareDebrief(
        proposal({ outcome: 'HAS_PROVIDER', providerType: 'VIDEO' }),
        logged({
          outcome,
          providerType: outcome === 'HAS_PROVIDER' ? 'MARKETING_AGENCY' : null,
        }),
      ).map((c) => c.field);
    expect(fields('HAS_PROVIDER')).toContain('provider');
    expect(fields('NOT_INTERESTED')).not.toContain('provider');
  });

  it('matches people by first name, ignoring accents and case', () => {
    const spokeWithMaria = proposal({
      people: [{ ...proposal().people[1], spokeWith: true }],
    });
    expect(
      fixed(
        compareDebrief(
          spokeWithMaria,
          logged({ contacts: [{ firstName: 'maria', lastName: null }] }),
        ),
      ),
    ).not.toContain('people');
  });

  it('counts no come-back on either side as kept', () => {
    expect(
      fixed(
        compareDebrief(
          proposal({ comeBackDate: null }),
          logged({ comeBackAt: null }),
        ),
      ),
    ).not.toContain('comeBack');
  });
});

describe('similarity', () => {
  it('is 1 for the same words, lower for edits, and counts added words against it', () => {
    expect(similarity('We spoke with Jen.', 'we spoke with jen')).toBe(1);
    expect(
      similarity('We spoke with Jen.', 'We spoke with Jen and Maria.'),
    ).toBeCloseTo(4 / 6);
    expect(similarity('We spoke with Jen.', 'Closed.')).toBe(0);
    expect(similarity('', '')).toBe(1);
  });
});
