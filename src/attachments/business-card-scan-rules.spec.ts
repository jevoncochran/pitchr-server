import { BusinessCardScanStatus } from '@prisma/client';
import {
  BusinessCardReading,
  BusinessInfo,
  ExistingContact,
  likelyDuplicates,
  PersonCard,
  planBusinessCardScan,
  planPerson,
  sameValue,
} from './business-card-scan-rules';

const business = (over: Partial<BusinessInfo> = {}): BusinessInfo => ({
  name: null,
  email: null,
  website: null,
  instagramHandle: null,
  address: null,
  addressLine1: null,
  city: null,
  state: null,
  zip: null,
  otherPhones: [],
  socialHandles: [],
  suggestedIndustryId: null,
  suggestedBusinessTypeId: null,
  ...over,
});

const person = (over: Partial<PersonCard> = {}): PersonCard => ({
  photos: [0],
  firstName: 'María',
  lastName: 'López',
  title: 'Owner',
  email: 'maria@lopezmedspa.com',
  phone: '(813) 555-0101',
  isDecisionMaker: true,
  businessName: 'Lopez Med Spa',
  sameBusiness: 'yes',
  match: 'new',
  matchedContactId: null,
  candidateContactIds: [],
  ...over,
});

const reading = (
  over: Partial<BusinessCardReading> = {},
): BusinessCardReading => ({
  business: business(),
  people: [person()],
  businessOnlyPhotos: [],
  notBusinessCardPhotos: [],
  ...over,
});

const MARIA: ExistingContact = {
  id: 'c-maria',
  firstName: 'Maria',
  lastName: null,
  title: null,
  email: null,
  phone: null,
  isDecisionMaker: false,
};

describe('planPerson', () => {
  it('creates a new contact with everything on the business card', () => {
    const plan = planPerson(person(), [MARIA]);
    expect(plan.status).toBe(BusinessCardScanStatus.BUSINESS_CARD);
    expect(plan.createContact).toEqual({
      firstName: 'María',
      lastName: 'López',
      title: 'Owner',
      email: 'maria@lopezmedspa.com',
      phone: '(813) 555-0101',
      isDecisionMaker: true,
    });
  });

  it('fills in the empty fields of an existing contact and turns decision-maker on', () => {
    const plan = planPerson(
      person({ match: 'existing', matchedContactId: 'c-maria' }),
      [MARIA],
    );
    expect(plan.contactId).toBe('c-maria');
    expect(plan.createContact).toBeUndefined();
    // "Maria" on file and "María" on the business card are the same name
    expect(plan.updateContact).toEqual({
      id: 'c-maria',
      data: {
        lastName: 'López',
        title: 'Owner',
        email: 'maria@lopezmedspa.com',
        phone: '(813) 555-0101',
        isDecisionMaker: true,
      },
    });
    expect(plan.suggestions).toEqual([]);
  });

  it('suggests a different value instead of overwriting it', () => {
    const onFile = {
      ...MARIA,
      email: 'maria@gmail.com',
      phone: '+1 813-555-0101',
      title: 'OWNER',
    };
    const plan = planPerson(
      person({ match: 'existing', matchedContactId: 'c-maria' }),
      [onFile],
    );
    expect(plan.suggestions).toEqual([
      {
        contactId: 'c-maria',
        field: 'email',
        currentValue: 'maria@gmail.com',
        suggestedValue: 'maria@lopezmedspa.com',
      },
    ]);
    expect(plan.updateContact?.data).toEqual({
      lastName: 'López',
      isDecisionMaker: true,
    });
  });

  it('never turns decision-maker off', () => {
    const plan = planPerson(
      person({
        match: 'existing',
        matchedContactId: 'c-maria',
        isDecisionMaker: false,
        lastName: null,
        title: null,
        email: null,
        phone: null,
      }),
      [{ ...MARIA, isDecisionMaker: true }],
    );
    expect(plan.updateContact).toBeUndefined();
    expect(plan.contactId).toBe('c-maria');
  });

  it('waits for the owner when the business card could be more than one contact', () => {
    const plan = planPerson(person({ match: 'ambiguous' }), [MARIA]);
    expect(plan.status).toBe(BusinessCardScanStatus.NEEDS_MATCH);
    expect(plan.createContact).toBeUndefined();
  });

  it("uses the owner's pick for an ambiguous business card", () => {
    const ambiguous = person({ match: 'ambiguous' });
    expect(
      planPerson(ambiguous, [MARIA], { contactId: 'c-maria' }).contactId,
    ).toBe('c-maria');
    expect(
      planPerson(ambiguous, [MARIA], { contactId: 'new' }).createContact
        ?.firstName,
    ).toBe('María');
  });

  it('holds a business card for another business until "Add anyway"', () => {
    const other = person({
      sameBusiness: 'no',
      businessName: 'Bright Smile Dental',
    });
    expect(planPerson(other, [])).toEqual({
      status: BusinessCardScanStatus.OTHER_BUSINESS,
      suggestions: [],
    });
    expect(
      planPerson(other, [], { addAnyway: true }).createContact?.firstName,
    ).toBe('María');
    // A business card that names no business is taken as this lead's
    expect(
      planPerson(person({ sameBusiness: 'unclear' }), []).createContact,
    ).toBeDefined();
  });
});

describe('planBusinessCardScan', () => {
  it('plans each person, the shared back and photos that are not business cards', () => {
    const plan = planBusinessCardScan(
      reading({
        people: [
          person({ photos: [0] }),
          person({ photos: [1], firstName: 'Sam', lastName: null }),
          person({ photos: [2], firstName: 'Tom', sameBusiness: 'no' }),
        ],
        businessOnlyPhotos: [3],
        notBusinessCardPhotos: [4],
      }),
      [],
      null,
    );
    expect(
      plan.people.map((p) => [p.personIndex, p.photos, p.plan.status]),
    ).toEqual([
      [0, [0], BusinessCardScanStatus.BUSINESS_CARD],
      [1, [1], BusinessCardScanStatus.BUSINESS_CARD],
      [2, [2], BusinessCardScanStatus.OTHER_BUSINESS],
    ]);
    expect(plan.businessOnlyPhotos).toEqual([3]);
    expect(plan.notBusinessCardPhotos).toEqual([4]);
  });

  it('fills in an empty lead website, but never replaces one', () => {
    const withSite = reading({
      business: business({ website: 'lopezmedspa.com' }),
    });
    expect(planBusinessCardScan(withSite, [], null).leadWebsite).toBe(
      'lopezmedspa.com',
    );
    expect(planBusinessCardScan(withSite, [], '  ').leadWebsite).toBe(
      'lopezmedspa.com',
    );
    expect(
      planBusinessCardScan(withSite, [], 'old-site.com').leadWebsite,
    ).toBeUndefined();
  });

  it("doesn't take the website when every business card is for another business", () => {
    const plan = planBusinessCardScan(
      reading({
        business: business({ website: 'brightsmile.com' }),
        people: [person({ sameBusiness: 'no' })],
      }),
      [],
      null,
    );
    expect(plan.leadWebsite).toBeUndefined();
  });

  it('takes the website from a back with no person on it', () => {
    const plan = planBusinessCardScan(
      reading({
        business: business({ website: 'lopezmedspa.com' }),
        people: [],
        businessOnlyPhotos: [0],
      }),
      [],
      null,
    );
    expect(plan.leadWebsite).toBe('lopezmedspa.com');
    expect(plan.people).toEqual([]);
  });
});

describe('likelyDuplicates', () => {
  const lead = (id: string, over: object = {}) => ({
    id,
    business: 'Somewhere Else',
    website: null,
    email: null,
    contacts: [],
    ...over,
  });
  const card = (
    over: Partial<BusinessInfo> = {},
    people: Partial<PersonCard> = {},
  ) =>
    reading({
      business: business({ name: 'Lopez Med Spa', ...over }),
      people: [person({ email: null, phone: null, ...people })],
    });

  it('matches the same website, however it is written', () => {
    const found = likelyDuplicates(
      card({ website: 'https://www.LopezMedSpa.com/about' }),
      [
        lead('l-1', { website: 'lopezmedspa.com' }),
        lead('l-2', { website: 'other.com' }),
      ],
    );
    expect(found.map((l) => l.id)).toEqual(['l-1']);
  });

  it('matches an email at the same business domain, but not a shared one like gmail', () => {
    const found = likelyDuplicates(
      card({ name: null }, { email: 'maria@lopezmedspa.com' }),
      [
        lead('l-1', {
          contacts: [{ email: 'front@lopezmedspa.com', phone: null }],
        }),
      ],
    );
    expect(found.map((l) => l.id)).toEqual(['l-1']);

    const gmail = likelyDuplicates(
      card({ name: null }, { email: 'maria@gmail.com' }),
      [lead('l-2', { email: 'someone@gmail.com' })],
    );
    expect(gmail).toEqual([]);
  });

  it('matches the same phone and the same name, ignoring "The" and "LLC"', () => {
    const found = likelyDuplicates(card({}, { phone: '+1 (813) 555-0101' }), [
      lead('l-phone', { contacts: [{ email: null, phone: '813.555.0101' }] }),
      lead('l-name', { business: 'The Lopez Med Spa, LLC' }),
    ]);
    expect(found.map((l) => l.id).sort()).toEqual(['l-name', 'l-phone']);
  });

  it('ranks stronger matches first and returns at most three', () => {
    const found = likelyDuplicates(card({ website: 'lopezmedspa.com' }), [
      lead('weak', { business: 'Lopez Med Spa Orlando' }),
      lead('strong', { business: 'Lopez Med Spa', website: 'lopezmedspa.com' }),
      lead('w2', { business: 'Lopez Med Spa Tampa' }),
      lead('w3', { business: 'Lopez Med Spa Miami' }),
    ]);
    expect(found).toHaveLength(3);
    expect(found[0].id).toBe('strong');
  });
});

describe('sameValue', () => {
  it('ignores case, accents and spacing', () => {
    expect(sameValue('lastName', 'Lopez', 'LÓPEZ ')).toBe(true);
    expect(sameValue('title', 'Office  Manager', 'office manager')).toBe(true);
    expect(sameValue('firstName', 'Bob', 'Robert')).toBe(false);
  });

  it('compares phone numbers by their digits', () => {
    expect(sameValue('phone', '+1 (813) 555-0101', '813.555.0101')).toBe(true);
    expect(sameValue('phone', '813-555-0101', '813-555-0102')).toBe(false);
  });
});
