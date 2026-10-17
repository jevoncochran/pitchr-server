import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { StorageService } from 'src/storage/storage.service';
import {
  BusinessCardScanService,
  readBusinessCards,
} from './business-card-scan.service';
import { BusinessCardsService } from './business-cards.service';

// No real (paid) Claude calls; the image handling is tested with the scan service
jest.mock('./business-card-scan.service', () => ({
  BusinessCardScanService: jest.fn(),
  readBusinessCards: jest.fn(),
}));
const read = readBusinessCards as jest.MockedFunction<typeof readBusinessCards>;

let created = 0;
const db = {
  attachment: {
    create: jest.fn(() => Promise.resolve({ id: `a-new-${++created}` })),
    update: jest.fn((a: { where: { id: string }; data: object }) => ({
      id: a.where.id,
      ...a.data,
    })),
    delete: jest.fn().mockResolvedValue({}),
    updateMany: jest.fn(),
    findMany: jest.fn().mockResolvedValue([]),
  },
  industry: {
    findMany: jest.fn().mockResolvedValue([{ id: 'i-1', name: 'Aesthetics' }]),
  },
  businessType: {
    findMany: jest.fn().mockResolvedValue([{ id: 't-1', name: 'Med spa' }]),
  },
  lead: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: 'l-1',
        business: 'Lopez Med Spa',
        website: null,
        email: null,
        contacts: [],
      },
    ]),
    findUnique: jest.fn().mockResolvedValue({ id: 'l-1' }),
  },
};
const storage = {
  upload: jest.fn((file: { originalname: string }) =>
    Promise.resolve({
      url: `https://files/${file.originalname}`,
      key: `business-cards/${file.originalname}`,
    }),
  ),
  delete: jest.fn().mockResolvedValue(undefined),
};
const scan = { scanInBackground: jest.fn() };
const service = new BusinessCardsService(
  db as unknown as DatabaseService,
  storage as unknown as StorageService,
  scan as unknown as BusinessCardScanService,
);

const photo = (name: string) =>
  ({
    originalname: name,
    mimetype: 'image/jpeg',
    size: 100,
    buffer: Buffer.from(name),
  }) as Express.Multer.File;

const READING = {
  business: {
    name: 'Lopez Med Spa',
    website: null,
    email: null,
    otherPhones: [],
  },
  people: [{ photos: [1], firstName: 'Sam', email: null, phone: null }],
  businessOnlyPhotos: [0],
  notBusinessCardPhotos: [],
} as never;

describe('BusinessCardsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    created = 0;
  });

  it('stores new photos on no lead, reads them with the lists, and finds likely duplicates', async () => {
    read.mockResolvedValue(READING);

    const result = await service.readForNewLead([
      photo('back.jpg'),
      photo('sam.jpg'),
    ]);

    expect(storage.upload).toHaveBeenCalledTimes(2);
    expect(db.attachment.create).toHaveBeenCalledWith({
      data: expect.not.objectContaining({ leadId: expect.anything() }),
    });
    expect(read).toHaveBeenCalledWith(
      [
        { url: '', original: Buffer.from('back.jpg') },
        { url: '', original: Buffer.from('sam.jpg') },
      ],
      {
        industries: [{ id: 'i-1', name: 'Aesthetics' }],
        businessTypes: [{ id: 't-1', name: 'Med spa' }],
      },
    );
    // Each photo keeps its role: the back for the business, Sam's card for Sam
    const roles = db.attachment.update.mock.calls.map(
      ([args]) =>
        (
          args as {
            data: {
              businessCardData: { role: string; personIndex: number | null };
            };
          }
        ).data.businessCardData,
    );
    expect(roles.map((r) => [r.role, r.personIndex])).toEqual([
      ['business', null],
      ['person', 0],
    ]);
    expect(result.duplicates).toEqual([
      { id: 'l-1', business: 'Lopez Med Spa' },
    ]);
  });

  it('reads earlier photos again with new ones ("Add the back or another card")', async () => {
    db.attachment.findMany.mockResolvedValueOnce([
      {
        id: 'a-front',
        url: 'https://files/front.jpg',
        businessCardBatchId: 'batch-1',
      },
    ]);
    read.mockResolvedValue(READING);

    await service.readForNewLead([photo('back.jpg')], ['a-front']);

    expect(read.mock.calls[0][0]).toEqual([
      { url: 'https://files/front.jpg', original: undefined },
      { url: '', original: Buffer.from('back.jpg') },
    ]);
    expect(db.attachment.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ businessCardBatchId: 'batch-1' }),
    });
  });

  it('keeps none of the new photos when they cannot be read', async () => {
    read.mockRejectedValue(new Error('pitchr-ai returned 502'));

    await expect(
      service.readForNewLead([photo('a.jpg'), photo('b.jpg')]),
    ).rejects.toThrow(BadGatewayException);
    expect(db.attachment.delete).toHaveBeenCalledTimes(2);
    expect(storage.delete).toHaveBeenCalledWith('business-cards/a.jpg');
  });

  it('refuses more than 6 photos, counting earlier ones, and files that are not photos', async () => {
    await expect(
      service.readForNewLead(
        [photo('1'), photo('2')],
        ['a', 'b', 'c', 'd', 'e'],
      ),
    ).rejects.toThrow(BadRequestException);
    await expect(
      service.readForNewLead([
        {
          ...photo('x.pdf'),
          mimetype: 'application/pdf',
        } as Express.Multer.File,
      ]),
    ).rejects.toThrow(BadRequestException);
    expect(storage.upload).not.toHaveBeenCalled();
  });

  it('refuses earlier photos that are already on a lead', async () => {
    db.attachment.findMany.mockResolvedValueOnce([]);

    await expect(
      service.readForNewLead([photo('back.jpg')], ['a-used']),
    ).rejects.toThrow(BadRequestException);
  });

  it('adds unused business cards to an existing lead and reads them again together there', async () => {
    db.attachment.updateMany.mockResolvedValue({ count: 2 });

    await service.addToLead(['a-1', 'a-2'], 'l-1', 'u-1');

    expect(db.attachment.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['a-1', 'a-2'] }, leadId: null, contactId: null },
      data: expect.objectContaining({
        leadId: 'l-1',
        businessCardScan: 'PENDING',
      }),
    });
    expect(scan.scanInBackground).toHaveBeenCalledWith(['a-1', 'a-2'], 'u-1');
  });

  it('refuses business cards that are already on a lead', async () => {
    db.attachment.updateMany.mockResolvedValue({ count: 1 });

    await expect(service.addToLead(['a-1', 'a-2'], 'l-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(scan.scanInBackground).not.toHaveBeenCalled();
  });
});
