import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly storageService: StorageService,
  ) {}

  async upload(
    file: Express.Multer.File,
    opts: { leadId?: string; contactId?: string; touchpointId?: string; caption?: string },
  ) {
    const folder = opts.leadId ?? opts.contactId ?? 'general';
    const { url, key } = await this.storageService.upload(file, folder);

    return this.databaseService.attachment.create({
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
      },
    });
  }

  async findByLead(leadId: string) {
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
