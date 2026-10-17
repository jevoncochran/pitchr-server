import { randomUUID } from 'crypto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BusinessCardScanStatus } from '@prisma/client';
import { toJpegIfHeic } from 'src/common/images';
import { DatabaseService } from 'src/database/database.service';
import { StorageService } from 'src/storage/storage.service';
import { BusinessCardScanService } from './business-card-scan.service';

/** Up to 3 people's business cards, front and back (docs/business-card-scan.md) */
export const MAX_BUSINESS_CARD_PHOTOS = 6;

@Injectable()
export class AttachmentsService {
  private readonly logger = new Logger(AttachmentsService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storageService: StorageService,
    private readonly businessCardScanService: BusinessCardScanService,
  ) {}

  async upload(
    upload: Express.Multer.File,
    opts: {
      leadId?: string;
      contactId?: string;
      touchpointId?: string;
      caption?: string;
    },
    userId?: string,
  ) {
    const file = await this.asJpeg(upload);
    const folder = opts.leadId ?? opts.contactId ?? 'general';
    const { url, key } = await this.storageService.upload(file, folder);

    // Images on a lead are read as possible business cards (docs/business-card-scan.md),
    // after the upload has answered
    const scannable = this.businessCardScanService.isScannable({
      mimeType: file.mimetype,
      leadId: opts.leadId || null,
    });

    const attachment = await this.databaseService.attachment.create({
      data: {
        leadId: opts.leadId || undefined,
        contactId: opts.contactId || undefined,
        touchpointId: opts.touchpointId || undefined,
        url,
        key,
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        caption: opts.caption || null,
        businessCardScan: scannable ? BusinessCardScanStatus.PENDING : null,
        businessCardBatchId: scannable ? randomUUID() : null,
      },
    });
    if (scannable) {
      this.businessCardScanService.scanInBackground([attachment.id], userId, [
        file.buffer,
      ]);
    }
    return attachment;
  }

  /**
   * Several business cards at once (docs/business-card-scan.md): up to 6
   * photos on one lead, stored and then read together in the background.
   */
  async uploadBusinessCards(
    uploads: Express.Multer.File[],
    leadId: string,
    userId?: string,
  ) {
    if (uploads.length === 0)
      throw new BadRequestException('No photos provided');
    if (uploads.length > MAX_BUSINESS_CARD_PHOTOS) {
      throw new BadRequestException(
        `Up to ${MAX_BUSINESS_CARD_PHOTOS} photos at a time`,
      );
    }
    if (uploads.some((upload) => !upload.mimetype.startsWith('image/'))) {
      throw new BadRequestException('Business cards must be photos');
    }
    const lead = await this.databaseService.lead.findUnique({
      where: { id: leadId },
      select: { id: true },
    });
    if (!lead) throw new NotFoundException('Lead not found');

    const batchId = randomUUID();
    const files = await Promise.all(
      uploads.map((upload) => this.asJpeg(upload)),
    );
    const attachments = [];
    for (const file of files) {
      const { url, key } = await this.storageService.upload(file, leadId);
      attachments.push(
        await this.databaseService.attachment.create({
          data: {
            leadId,
            url,
            key,
            filename: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            businessCardScan: BusinessCardScanStatus.PENDING,
            businessCardBatchId: batchId,
          },
        }),
      );
    }
    this.businessCardScanService.scanInBackground(
      attachments.map((attachment) => attachment.id),
      userId,
      files.map((file) => file.buffer),
    );
    return attachments;
  }

  /**
   * iPhone photos (HEIC) are stored as JPEG, so every browser can show them and
   * business card scan can read them. If one can't be converted, the original
   * is kept: an upload never fails over this.
   */
  private async asJpeg(upload: Express.Multer.File) {
    try {
      return await toJpegIfHeic(upload);
    } catch (error) {
      this.logger.warn(
        `Couldn't convert ${upload.originalname} to JPEG: ${error}`,
      );
      return upload;
    }
  }

  async findByLead(leadId: string) {
    await this.businessCardScanService.expireStaleScans(leadId);
    return this.databaseService.attachment.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByContact(contactId: string) {
    return this.databaseService.attachment.findMany({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateCaption(id: string, caption: string) {
    return this.databaseService.attachment.update({
      where: { id },
      data: { caption },
    });
  }

  async remove(id: string) {
    const attachment = await this.databaseService.attachment.findUnique({
      where: { id },
    });
    if (!attachment) throw new NotFoundException('Attachment not found');

    await this.storageService.delete(attachment.key);
    return this.databaseService.attachment.delete({ where: { id } });
  }
}
