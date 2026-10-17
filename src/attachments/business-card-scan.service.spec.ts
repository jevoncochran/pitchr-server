import { BadRequestException } from '@nestjs/common';
import { BusinessCardScanStatus } from '@prisma/client';
import sharp = require('sharp');
import { postToPitchrAi } from 'src/common/pitchr-ai';
import { DatabaseService } from 'src/database/database.service';
import {
  BusinessCardReading,
  BusinessInfo,
  PersonCard,
} from './business-card-scan-rules';
import { BusinessCardScanService } from './business-card-scan.service';

// pitchr-ai is mocked: no real (paid) Claude calls.
jest.mock('src/common/pitchr-ai', () => ({
  postToPitchrAi: jest.fn(),
}));
const pitchrAi = postToPitchrAi as jest.MockedFunction<typeof postToPitchrAi>;

const tx = {
  contact: {
    create: jest.fn(),
    update: jest.fn(),
  },
  contactChangeSuggestion: { upsert: jest.fn() },
  lead: { updateMany: jest.fn() },
  attachment: { updateMany: jest.fn() },
};
const db = {
  attachment: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn((a: unknown) => a),
    updateMany: jest.fn(),
  },
  $transaction: jest.fn((fn: (t: typeof tx) => unknown) => fn(tx)),
};
const service = new BusinessCardScanService(db as unknown as DatabaseService);

const MARIA = {
  id: 'c-maria',
  firstName: 'Maria',
  lastName: null,
  title: null,
  email: 'maria@gmail.com',
  phone: null,
  isDecisionMaker: false,
};
const LEAD = {
  id: 'lead-1',
  business: 'Lopez Med Spa',
  website: null,
  contacts: [MARIA],
};

const photo = (id: string, over: object = {}) => ({
  id,
  url: `https://files.example/${id}.jpg`,
  businessCardScan: BusinessCardScanStatus.PENDING,
  businessCardData: null,
  businessCardBatchId: 'batch-1',
  lead: LEAD,
  ...over,
});

const business = (over: Partial<BusinessInfo> = {}): BusinessInfo => ({
  name: 'Lopez Med Spa',
  email: null,
  website: 'lopezmedspa.com',
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
  phone: '813-555-0101',
  isDecisionMaker: true,
  businessName: 'Lopez Med Spa',
  sameBusiness: 'yes',
  match: 'existing',
  matchedContactId: 'c-maria',
  candidateContactIds: [],
  ...over,
});

// Maria's card, Sam's card, the back they share
const READING: BusinessCardReading = {
  business: business(),
  people: [
    person(),
    person({
      photos: [1],
      firstName: 'Sam',
      lastName: null,
      title: 'Marketing coordinator',
      email: null,
      phone: null,
      isDecisionMaker: false,
      match: 'new',
      matchedContactId: null,
    }),
  ],
  businessOnlyPhotos: [2],
  notBusinessCardPhotos: [],
};

let image: Buffer;

beforeAll(async () => {
  // A real 3000x2000 JPEG, to check photos are shrunk before being sent
  image = await sharp({
    create: { width: 3000, height: 2000, channels: 3, background: '#fff' },
  })
    .jpeg()
    .toBuffer();
});

const photoUpdates = () =>
  tx.attachment.updateMany.mock.calls.map(
    ([args]) =>
      args as {
        where: { id: { in: string[] } };
        data: {
          businessCardScan: string;
          contactId?: string;
          businessCardData: { role: string };
        };
      },
  );

describe('BusinessCardScanService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    tx.contact.create.mockResolvedValue({ id: 'c-sam' });
  });

  it('only reads images on a lead', () => {
    expect(service.isScannable({ mimeType: 'image/jpeg', leadId: 'l' })).toBe(
      true,
    );
    expect(
      service.isScannable({ mimeType: 'application/pdf', leadId: 'l' }),
    ).toBe(false);
    expect(service.isScannable({ mimeType: 'image/jpeg', leadId: null })).toBe(
      false,
    );
  });

  it('reads the photos together, shrunk, with the lead and its contacts', async () => {
    db.attachment.findMany.mockResolvedValue([
      photo('a-1'),
      photo('a-2'),
      photo('a-3'),
    ]);
    pitchrAi.mockResolvedValue(READING);

    await service.scan(['a-1', 'a-2', 'a-3'], 'u-1', [image, image, image]);

    const [path, sent] = pitchrAi.mock.calls[0];
    const body = sent as {
      photos: { data: string }[];
      business: string;
      contacts: unknown[];
    };
    expect(path).toBe('/business-cards/scan');
    expect(body.photos).toHaveLength(3);
    expect(body.business).toBe('Lopez Med Spa');
    expect(body.contacts).toEqual([MARIA]);
    const shrunk = await sharp(
      Buffer.from(body.photos[0].data, 'base64'),
    ).metadata();
    expect([shrunk.width, shrunk.height]).toEqual([1568, 1045]);
  });

  it('applies each person, the shared back and the lead website', async () => {
    db.attachment.findMany.mockResolvedValue([
      photo('a-1'),
      photo('a-2'),
      photo('a-3'),
    ]);
    pitchrAi.mockResolvedValue(READING);

    await service.scan(['a-1', 'a-2', 'a-3'], 'u-1', [image, image, image]);

    // Maria: empty fields filled in, the different email suggested
    expect(tx.contact.update).toHaveBeenCalledWith({
      where: { id: 'c-maria' },
      data: {
        lastName: 'López',
        title: 'Owner',
        phone: '813-555-0101',
        isDecisionMaker: true,
      },
    });
    expect(tx.contactChangeSuggestion.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          field: 'email',
          attachmentId: 'a-1',
        }),
      }),
    );
    // Sam: a new contact met in person
    expect(tx.contact.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        firstName: 'Sam',
        howWeMet: 'IN_PERSON',
        leadId: 'lead-1',
        userId: 'u-1',
      }),
    });
    // Each photo linked to its person; the shared back to nobody
    const updates = photoUpdates();
    expect(
      updates.map((u) => [
        u.where.id.in,
        u.data.businessCardScan,
        u.data.contactId,
        u.data.businessCardData.role,
      ]),
    ).toEqual([
      [['a-1'], 'BUSINESS_CARD', 'c-maria', 'person'],
      [['a-2'], 'BUSINESS_CARD', 'c-sam', 'person'],
      [['a-3'], 'BUSINESS_CARD', undefined, 'business'],
    ]);
    expect(tx.lead.updateMany).toHaveBeenCalledWith({
      where: { id: 'lead-1', OR: [{ website: null }, { website: '' }] },
      data: { website: 'lopezmedspa.com' },
    });
  });

  it('holds a business card for another business without making a contact', async () => {
    db.attachment.findMany.mockResolvedValue([photo('a-1')]);
    pitchrAi.mockResolvedValue({
      ...READING,
      people: [
        person({
          sameBusiness: 'no',
          businessName: 'Bright Smile Dental',
          match: 'new',
          matchedContactId: null,
        }),
      ],
      businessOnlyPhotos: [],
    });

    await service.scan(['a-1'], 'u-1', [image]);

    expect(tx.contact.create).not.toHaveBeenCalled();
    expect(photoUpdates()[0].data.businessCardScan).toBe('OTHER_BUSINESS');
  });

  it('records a failure on every photo instead of throwing', async () => {
    db.attachment.findMany.mockResolvedValue([photo('a-1'), photo('a-2')]);
    pitchrAi.mockRejectedValue(new Error('pitchr-ai returned 502'));

    await service.scan(['a-1', 'a-2'], 'u-1', [image, image]);

    expect(db.attachment.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['a-1', 'a-2'] } },
      data: expect.objectContaining({
        businessCardScan: BusinessCardScanStatus.FAILED,
      }),
    });
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('refuses photos from different leads', async () => {
    db.attachment.findMany.mockResolvedValue([
      photo('a-1'),
      photo('a-2', { lead: { ...LEAD, id: 'lead-2' } }),
    ]);

    await service.scan(['a-1', 'a-2']);

    expect(pitchrAi).not.toHaveBeenCalled();
    expect(db.attachment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ businessCardScan: 'FAILED' }),
      }),
    );
  });

  const stored = (
    status: BusinessCardScanStatus,
    over: Partial<PersonCard> = {},
  ) =>
    photo('a-1', {
      businessCardScan: status,
      businessCardData: {
        role: 'person',
        person: person({ match: 'ambiguous', matchedContactId: null, ...over }),
        personIndex: 0,
        business: business(),
      },
    });

  it("applies the owner's pick to all of that person's photos, without reading again", async () => {
    db.attachment.findUnique.mockResolvedValue(
      stored(BusinessCardScanStatus.NEEDS_MATCH),
    );
    db.attachment.findMany.mockResolvedValue([
      stored(BusinessCardScanStatus.NEEDS_MATCH),
      { ...stored(BusinessCardScanStatus.NEEDS_MATCH), id: 'a-2' },
      photo('a-3', {
        businessCardData: { role: 'business', personIndex: null },
      }),
    ]);

    await service.resolveMatch('a-1', 'new', 'u-1');

    expect(pitchrAi).not.toHaveBeenCalled();
    expect(tx.contact.create).toHaveBeenCalled();
    expect(photoUpdates()[0].where.id.in).toEqual(['a-1', 'a-2']);
  });

  it('refuses a pick that is not one of the lead contacts', async () => {
    db.attachment.findUnique.mockResolvedValue(
      stored(BusinessCardScanStatus.NEEDS_MATCH),
    );

    await expect(service.resolveMatch('a-1', 'c-other')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('"Add anyway" takes a business card for another business as this lead\'s', async () => {
    db.attachment.findUnique.mockResolvedValue(
      stored(BusinessCardScanStatus.OTHER_BUSINESS, {
        sameBusiness: 'no',
        match: 'new',
      }),
    );
    db.attachment.findMany.mockResolvedValue([
      stored(BusinessCardScanStatus.OTHER_BUSINESS, {
        sameBusiness: 'no',
        match: 'new',
      }),
    ]);

    await service.addAnyway('a-1', 'u-1');

    expect(tx.contact.create).toHaveBeenCalled();
    expect(photoUpdates()[0].data.businessCardScan).toBe('BUSINESS_CARD');
  });

  it('retries the failed photos uploaded together', async () => {
    db.attachment.findUnique.mockResolvedValue(
      photo('a-1', { businessCardScan: 'FAILED' }),
    );
    db.attachment.findMany.mockResolvedValueOnce([
      { id: 'a-1' },
      { id: 'a-2' },
    ]);
    db.attachment.findMany.mockResolvedValue([]);

    await service.retry('a-1', 'u-1');

    expect(db.attachment.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['a-1', 'a-2'] } },
      data: { businessCardScan: 'PENDING', businessCardScannedAt: null },
    });
  });

  it('only retries a failed scan', async () => {
    db.attachment.findUnique.mockResolvedValue(
      photo('a-1', { businessCardScan: 'BUSINESS_CARD' }),
    );

    await expect(service.retry('a-1')).rejects.toThrow(BadRequestException);
  });

  it('marks scans stuck in PENDING for over 5 minutes as failed', async () => {
    await service.expireStaleScans('lead-1');

    const { where, data } = db.attachment.updateMany.mock.calls[0][0] as {
      where: { createdAt: { lt: Date } };
      data: unknown;
    };
    expect(data).toEqual({ businessCardScan: BusinessCardScanStatus.FAILED });
    expect(Date.now() - where.createdAt.lt.getTime()).toBeGreaterThanOrEqual(
      5 * 60_000,
    );
  });
});
