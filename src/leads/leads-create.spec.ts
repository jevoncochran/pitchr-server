import { BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { lookUpCoordinates } from 'src/locations/locations.service';
import { LeadsService } from './leads.service';

// No real Google calls; the stage history is tested in lead-stage.spec.ts
jest.mock('src/locations/locations.service', () => ({
  lookUpCoordinates: jest.fn(),
}));
jest.mock('./lead-stage', () => ({
  ...jest.requireActual('./lead-stage'),
  recordInitialStage: jest.fn(),
}));
const geocode = lookUpCoordinates as jest.MockedFunction<
  typeof lookUpCoordinates
>;

const tx = {
  lead: {
    create: jest.fn().mockResolvedValue({ id: 'lead-1' }),
    update: jest.fn(),
  },
  location: { create: jest.fn().mockResolvedValue({ id: 'loc-1' }) },
  contact: { create: jest.fn() },
  note: { create: jest.fn() },
  attachment: { updateMany: jest.fn() },
};
const db = {
  $transaction: jest.fn((fn: (t: typeof tx) => unknown) => fn(tx)),
};
const service = new LeadsService(db as unknown as DatabaseService);

const LEAD = { business: 'Lopez Med Spa' } as never;

describe('LeadsService.create with details (Add Lead)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    let contacts = 0;
    tx.attachment.updateMany.mockImplementation(
      (args: { where: { id: { in?: string[] } } }) =>
        Promise.resolve({ count: args.where.id.in?.length ?? 0 }),
    );
    tx.contact.create.mockImplementation(() =>
      Promise.resolve({ id: `c-${++contacts}` }),
    );
    geocode.mockResolvedValue({
      latitude: 28.5,
      longitude: -81.4,
      googlePlaceId: 'place-1',
    });
  });

  it('creates just the lead when nothing else is sent', async () => {
    await service.create(LEAD, 'u-1');

    expect(tx.lead.create).toHaveBeenCalled();
    expect(tx.location.create).not.toHaveBeenCalled();
    expect(tx.contact.create).not.toHaveBeenCalled();
  });

  it('saves the address as the primary location, looking up coordinates', async () => {
    await service.create(LEAD, 'u-1', {
      location: { addressLine1: '100 Main St', city: 'Orlando', state: 'FL' },
    });

    expect(geocode).toHaveBeenCalled();
    expect(tx.location.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        addressLine1: '100 Main St',
        zip: '',
        latitude: 28.5,
        googlePlaceId: 'place-1',
        businessId: 'lead-1',
      }),
    });
    expect(tx.lead.update).toHaveBeenCalledWith({
      where: { id: 'lead-1' },
      data: { primaryLocationId: 'loc-1' },
    });
  });

  it('keeps coordinates picked from the address search', async () => {
    await service.create(LEAD, 'u-1', {
      location: {
        addressLine1: '100 Main St',
        city: 'Orlando',
        state: 'FL',
        zip: '32801',
        latitude: 28.1,
        longitude: -81.1,
        googlePlaceId: 'picked',
      },
    });

    expect(geocode).not.toHaveBeenCalled();
    expect(tx.location.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        latitude: 28.1,
        googlePlaceId: 'picked',
      }),
    });
  });

  it('saves the contacts, how we met and the business card photos together', async () => {
    await service.create(LEAD, 'u-1', {
      contacts: [
        {
          firstName: ' María ',
          lastName: 'López',
          isDecisionMaker: true,
          businessCardAttachmentIds: ['a-maria'],
        },
        { firstName: 'Sam', businessCardAttachmentIds: ['a-sam'] },
        { firstName: 'Jen' },
      ],
      howWeMet: 'Met at the front desk',
      businessCardAttachmentIds: ['a-maria', 'a-sam', 'a-back'],
    });

    expect(tx.contact.create).toHaveBeenCalledTimes(3);
    expect(tx.contact.create).toHaveBeenNthCalledWith(1, {
      data: expect.objectContaining({
        firstName: 'María',
        isDecisionMaker: true,
        howWeMet: 'IN_PERSON',
        howWeMetNote: 'Met at the front desk',
        leadId: 'lead-1',
        userId: 'u-1',
      }),
    });
    // Jen was typed in by hand, not from a business card
    expect(tx.contact.create).toHaveBeenNthCalledWith(3, {
      data: expect.objectContaining({ firstName: 'Jen', howWeMet: null }),
    });
    expect(tx.note.create).toHaveBeenCalledWith({
      data: {
        text: 'How we met: Met at the front desk',
        leadId: 'lead-1',
        contactId: null,
        userId: 'u-1',
      },
    });
    // All photos go on the lead, then each person's on their contact
    expect(tx.attachment.updateMany.mock.calls.map(([args]) => args)).toEqual([
      {
        where: {
          id: { in: ['a-maria', 'a-sam', 'a-back'] },
          leadId: null,
          contactId: null,
        },
        data: { leadId: 'lead-1', businessCardScan: 'BUSINESS_CARD' },
      },
      { where: { id: { in: ['a-maria'] } }, data: { contactId: 'c-1' } },
      { where: { id: { in: ['a-sam'] } }, data: { contactId: 'c-2' } },
    ]);
  });

  it('puts how we met on the only contact', async () => {
    await service.create(LEAD, 'u-1', {
      contacts: [{ firstName: 'Jen' }],
      howWeMet: 'Coffee shop',
    });

    expect(tx.note.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ contactId: 'c-1' }),
    });
  });

  it('refuses business card photos that are already on a lead', async () => {
    tx.attachment.updateMany.mockResolvedValueOnce({ count: 1 });

    await expect(
      service.create(LEAD, 'u-1', {
        businessCardAttachmentIds: ['a-1', 'a-used'],
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it("refuses a contact's business card that isn't one of the lead's", async () => {
    await expect(
      service.create(LEAD, 'u-1', {
        contacts: [
          { firstName: 'Sam', businessCardAttachmentIds: ['a-other'] },
        ],
        businessCardAttachmentIds: ['a-1'],
      }),
    ).rejects.toThrow(BadRequestException);
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('refuses an address without a street, city and state', async () => {
    await expect(
      service.create(LEAD, 'u-1', {
        location: { addressLine1: '', city: 'Orlando', state: 'FL' },
      }),
    ).rejects.toThrow(BadRequestException);
    expect(db.$transaction).not.toHaveBeenCalled();
  });
});
