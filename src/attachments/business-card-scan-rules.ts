// What a business card scan changes (docs/business-card-scan.md), worked out without touching the
// database so every rule can be tested on its own.

import { BusinessCardScanStatus } from '@prisma/client';

/** The business, as pitchr-ai read it from the photos (Business in pitchr-ai). */
export interface BusinessInfo {
  name: string | null;
  email: string | null;
  website: string | null;
  instagramHandle: string | null;
  address: string | null;
  addressLine1: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  otherPhones: string[];
  socialHandles: string[];
  suggestedIndustryId: string | null;
  suggestedBusinessTypeId: string | null;
}

/** One person's business card (PersonCard in pitchr-ai). `photos` are positions in the upload. */
export interface PersonCard {
  photos: number[];
  firstName: string;
  lastName: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  isDecisionMaker: boolean;
  businessName: string | null;
  sameBusiness: 'yes' | 'no' | 'unclear';
  match: 'existing' | 'new' | 'ambiguous';
  matchedContactId: string | null;
  candidateContactIds: string[];
}

/** What pitchr-ai's POST /business-cards/scan returns for one upload (up to 6 photos). */
export interface BusinessCardReading {
  business: BusinessInfo;
  people: PersonCard[];
  businessOnlyPhotos: number[];
  notBusinessCardPhotos: number[];
}

/** What's kept on each photo (Attachment.businessCardData). */
export interface PhotoBusinessCardData {
  role: 'person' | 'business' | 'not_business_card';
  /** The person on this photo, and their place in the upload's reading */
  person: PersonCard | null;
  personIndex: number | null;
  business: BusinessInfo;
}

/** The contact fields a business card can fill in or suggest. */
export const BUSINESS_CARD_FIELDS = [
  'firstName',
  'lastName',
  'title',
  'email',
  'phone',
] as const;
export type BusinessCardField = (typeof BUSINESS_CARD_FIELDS)[number];

export interface ExistingContact {
  id: string;
  firstName: string;
  lastName: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  isDecisionMaker: boolean;
}

/** What one person's business card changes. */
export interface PersonPlan {
  status: BusinessCardScanStatus;
  /** The existing contact the business card belongs to (its photos get linked to it) */
  contactId?: string;
  /** A new contact to create on the lead (its photos get linked to it) */
  createContact?: Record<
    Exclude<BusinessCardField, 'firstName'>,
    string | null
  > & {
    firstName: string;
    isDecisionMaker: boolean;
  };
  /** Empty fields to fill in on an existing contact (and isDecisionMaker, only ever on) */
  updateContact?: {
    id: string;
    data: Partial<Record<BusinessCardField, string>> & {
      isDecisionMaker?: true;
    };
  };
  /** Different values the owner decides on (Replace / Keep) */
  suggestions: {
    contactId: string;
    field: BusinessCardField;
    currentValue: string;
    suggestedValue: string;
  }[];
}

/** What one upload changes, photo by photo. */
export interface BusinessCardScanPlan {
  people: { personIndex: number; photos: number[]; plan: PersonPlan }[];
  /** Sides with only the business on them: kept with the lead, on no contact */
  businessOnlyPhotos: number[];
  notBusinessCardPhotos: number[];
  /** The lead's website, when it was empty */
  leadWebsite?: string;
}

/** Work out what one upload changes. */
export function planBusinessCardScan(
  reading: BusinessCardReading,
  contacts: ExistingContact[],
  leadWebsite: string | null,
): BusinessCardScanPlan {
  const plan: BusinessCardScanPlan = {
    people: reading.people.map((person, personIndex) => ({
      personIndex,
      photos: person.photos,
      plan: planPerson(person, contacts),
    })),
    businessOnlyPhotos: reading.businessOnlyPhotos,
    notBusinessCardPhotos: reading.notBusinessCardPhotos,
  };
  // The business's website, unless every card is for some other business
  const website = clean(reading.business.website);
  const forThisLead =
    reading.people.length === 0 ||
    reading.people.some((person) => person.sameBusiness !== 'no');
  if (website && forThisLead && !clean(leadWebsite)) {
    plan.leadWebsite = website;
  }
  return plan;
}

/**
 * What one person's business card changes. `contactId` forces the match (the
 * owner picked a contact for a NEEDS_MATCH card, or 'new'); `addAnyway` takes
 * a card for another business as this lead's.
 */
export function planPerson(
  person: PersonCard,
  contacts: ExistingContact[],
  options: { contactId?: string | 'new'; addAnyway?: boolean } = {},
): PersonPlan {
  const { contactId, addAnyway } = options;
  if (person.sameBusiness === 'no' && !addAnyway && !contactId) {
    return { status: BusinessCardScanStatus.OTHER_BUSINESS, suggestions: [] };
  }

  const firstName = clean(person.firstName);
  if (!firstName) {
    return { status: BusinessCardScanStatus.BUSINESS_CARD, suggestions: [] };
  }

  let match: ExistingContact | 'new' | null;
  if (contactId === 'new') match = 'new';
  else if (contactId) match = contacts.find((c) => c.id === contactId) ?? null;
  else if (person.match === 'existing')
    match = contacts.find((c) => c.id === person.matchedContactId) ?? null;
  else if (person.match === 'new') match = 'new';
  else match = null;

  if (!match) {
    return { status: BusinessCardScanStatus.NEEDS_MATCH, suggestions: [] };
  }

  const plan: PersonPlan = {
    status: BusinessCardScanStatus.BUSINESS_CARD,
    suggestions: [],
  };
  if (match === 'new') {
    plan.createContact = {
      firstName,
      lastName: clean(person.lastName),
      title: clean(person.title),
      email: clean(person.email),
      phone: clean(person.phone),
      isDecisionMaker: person.isDecisionMaker,
    };
    return plan;
  }

  plan.contactId = match.id;
  const fill: NonNullable<PersonPlan['updateContact']>['data'] = {};
  for (const field of BUSINESS_CARD_FIELDS) {
    const businessCardValue = clean(person[field]);
    if (!businessCardValue) continue;
    const current = clean(match[field]);
    if (!current) fill[field] = businessCardValue;
    else if (!sameValue(field, current, businessCardValue)) {
      plan.suggestions.push({
        contactId: match.id,
        field,
        currentValue: current,
        suggestedValue: businessCardValue,
      });
    }
  }
  if (person.isDecisionMaker && !match.isDecisionMaker) {
    fill.isDecisionMaker = true;
  }
  if (Object.keys(fill).length > 0) {
    plan.updateContact = { id: match.id, data: fill };
  }
  return plan;
}

function clean(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** Same value written differently (case, accents, spacing, phone punctuation) isn't a change. */
export function sameValue(
  field: BusinessCardField,
  a: string,
  b: string,
): boolean {
  if (field === 'phone') return phoneDigits(a) === phoneDigits(b);
  return normalize(a) === normalize(b);
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function phoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '');
  // US numbers: "+1 (813) 555-0101" and "813-555-0101" are the same
  return digits.length === 11 && digits.startsWith('1')
    ? digits.slice(1)
    : digits;
}

/** What's compared to spot a business card for a business that's already a lead. */
export interface LeadForDuplicateCheck {
  id: string;
  business: string;
  website: string | null;
  email: string | null;
  contacts: { email: string | null; phone: string | null }[];
}

// Shared email providers: two businesses on gmail.com aren't the same business
const SHARED_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'live.com',
  'msn.com',
  'me.com',
]);

/**
 * Leads that look like the business on a new business card: the same website,
 * an email at the same (business) domain, the same phone, or the same name.
 * At most three, best matches first.
 */
export function likelyDuplicates(
  reading: BusinessCardReading,
  leads: LeadForDuplicateCheck[],
): { id: string; business: string }[] {
  const cardHost = host(reading.business.website);
  const cardEmails = [
    reading.business.email,
    ...reading.people.map((p) => p.email),
  ]
    .map((e) => e?.trim().toLowerCase())
    .filter((e): e is string => !!e);
  const cardDomains = cardEmails
    .map(emailDomain)
    .filter((d): d is string => !!d);
  const cardPhones = [
    ...reading.people.map((p) => p.phone),
    ...reading.business.otherPhones,
  ]
    .map((p) => (p ? phoneDigits(p) : ''))
    .filter((p) => p.length >= 10);
  const cardName = businessKey(reading.business.name);

  const scored = leads
    .map((lead) => {
      let score = 0;
      const leadEmails = [lead.email, ...lead.contacts.map((c) => c.email)]
        .map((e) => e?.trim().toLowerCase())
        .filter((e): e is string => !!e);
      if (cardHost && host(lead.website) === cardHost) score += 3;
      if (leadEmails.some((e) => cardEmails.includes(e))) score += 3;
      else if (
        leadEmails.some((e) => {
          const domain = emailDomain(e);
          return !!domain && cardDomains.includes(domain);
        })
      )
        score += 2;
      if (
        lead.contacts.some(
          (c) => c.phone && cardPhones.includes(phoneDigits(c.phone)),
        )
      )
        score += 2;
      const leadName = businessKey(lead.business);
      if (cardName && leadName) {
        if (cardName === leadName) score += 3;
        else if (
          Math.min(cardName.length, leadName.length) >= 5 &&
          (cardName.includes(leadName) || leadName.includes(cardName))
        )
          score += 1;
      }
      return { id: lead.id, business: lead.business, score };
    })
    .filter((lead) => lead.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(({ id, business }) => ({ id, business }));
}

function host(url: string | null | undefined): string | null {
  const trimmed = url?.trim().toLowerCase();
  if (!trimmed) return null;
  const withoutProtocol = trimmed.replace(/^[a-z]+:\/\//, '');
  return withoutProtocol.split(/[/?#]/)[0].replace(/^www\./, '') || null;
}

function emailDomain(email: string): string | null {
  const domain = email.split('@')[1]?.trim();
  return domain && !SHARED_EMAIL_DOMAINS.has(domain) ? domain : null;
}

/** "The Lopez Med Spa, LLC" and "lopez med spa" are the same name. */
function businessKey(name: string | null | undefined): string {
  return normalize(name ?? '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(the|llc|inc|co|corp|company|pllc|pa|and)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
