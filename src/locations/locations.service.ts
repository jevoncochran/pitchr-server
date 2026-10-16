import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { geocodeAddress } from 'src/common/google';

type AddressParts = {
  addressLine1?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
};

const ADDRESS_FIELDS = ['addressLine1', 'city', 'state', 'zip'] as const;

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLocationDto: Prisma.LocationCreateInput) {
    const coordinates =
      createLocationDto.latitude == null
        ? await this.lookUpCoordinates(createLocationDto)
        : {};
    return this.databaseService.location.create({
      data: { ...createLocationDto, ...coordinates },
    });
  }

  async findAll() {
    return this.databaseService.location.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.location.findUnique({ where: { id } });
  }

  async update(id: string, updateLocationDto: Prisma.LocationUpdateInput) {
    // A changed address without new coordinates gets looked up again, so the
    // pin never points at the old address
    const addressChanged = ADDRESS_FIELDS.some((f) => f in updateLocationDto);
    let coordinates = {};
    if (addressChanged && !('latitude' in updateLocationDto)) {
      const current = await this.databaseService.location.findUnique({
        where: { id },
      });
      if (!current) throw new NotFoundException('Location not found');
      coordinates = await this.lookUpCoordinates({
        ...current,
        ...(updateLocationDto as AddressParts),
      });
    }
    return this.databaseService.location.update({
      where: { id },
      data: { ...updateLocationDto, ...coordinates },
    });
  }

  async remove(id: string) {
    return this.databaseService.location.delete({ where: { id } });
  }

  /**
   * Coordinates for a hand-typed address (the address search sends its own).
   * Never blocks saving: if Google can't help, the location is saved without
   * coordinates and simply isn't on the map.
   */
  private async lookUpCoordinates(address: AddressParts) {
    const text = ADDRESS_FIELDS.map((f) => address[f])
      .filter((part) => typeof part === 'string' && part.trim())
      .join(', ');
    const none = { latitude: null, longitude: null, googlePlaceId: null };
    if (!text) return none;
    try {
      const found = await geocodeAddress(text);
      if (!found) return none;
      return {
        latitude: found.latitude,
        longitude: found.longitude,
        googlePlaceId: found.placeId,
      };
    } catch (error) {
      this.logger.warn(`Couldn't look up coordinates: ${error}`);
      return none;
    }
  }
}
