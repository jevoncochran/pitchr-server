import { DatabaseService } from 'src/database/database.service';
import { LocationsService } from './locations.service';
import { geocodeAddress } from 'src/common/google';

jest.mock('src/common/google', () => ({ geocodeAddress: jest.fn() }));
const geocode = geocodeAddress as jest.MockedFunction<typeof geocodeAddress>;

const db = {
  location: {
    create: jest.fn((args: unknown) => args),
    update: jest.fn((args: unknown) => args),
    findUnique: jest.fn(),
  },
};
const service = new LocationsService(db as unknown as DatabaseService);

const ADDRESS = {
  addressLine1: '1822 E 7th Ave',
  city: 'Tampa',
  state: 'FL',
  zip: '33605',
  business: { connect: { id: 'lead-1' } },
};

describe('LocationsService coordinates', () => {
  beforeEach(() => jest.clearAllMocks());

  it('keeps the coordinates the address search sent', async () => {
    await service.create({ ...ADDRESS, latitude: 27.96, longitude: -82.43 });

    expect(geocode).not.toHaveBeenCalled();
    expect(db.location.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ latitude: 27.96, longitude: -82.43 }),
    });
  });

  it('looks up a hand-typed address', async () => {
    geocode.mockResolvedValue({
      latitude: 27.9605,
      longitude: -82.4382,
      placeId: 'p-1',
    });

    await service.create(ADDRESS);

    expect(geocode).toHaveBeenCalledWith('1822 E 7th Ave, Tampa, FL, 33605');
    expect(db.location.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        latitude: 27.9605,
        googlePlaceId: 'p-1',
      }),
    });
  });

  it('still saves when Google fails', async () => {
    geocode.mockRejectedValue(new Error('down'));

    await service.create(ADDRESS);

    expect(db.location.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        addressLine1: '1822 E 7th Ave',
        latitude: null,
      }),
    });
  });

  it('looks up again when the address changes, not for other edits', async () => {
    db.location.findUnique.mockResolvedValue({
      ...ADDRESS,
      latitude: 1,
      longitude: 1,
    });
    geocode.mockResolvedValue({
      latitude: 28.05,
      longitude: -82.4,
      placeId: 'p-2',
    });

    await service.update('loc-1', { addressLine2: 'Suite 4' });
    expect(geocode).not.toHaveBeenCalled();

    await service.update('loc-1', { addressLine1: '4700 N Florida Ave' });
    expect(geocode).toHaveBeenCalledWith(
      '4700 N Florida Ave, Tampa, FL, 33605',
    );
    expect(db.location.update).toHaveBeenLastCalledWith({
      where: { id: 'loc-1' },
      data: expect.objectContaining({ latitude: 28.05, googlePlaceId: 'p-2' }),
    });
  });
});
