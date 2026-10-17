import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  AttachmentsService,
  MAX_BUSINESS_CARD_PHOTOS,
} from './attachments.service';
import { BusinessCardScanService } from './business-card-scan.service';

type AuthedRequest = { user: { id: string } };

const ALLOWED_MIME_PREFIXES = ['image/', 'video/'];
const ALLOWED_MIME_EXACT = ['application/pdf'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

@Controller('attachments')
export class AttachmentsController {
  constructor(
    private readonly attachmentsService: AttachmentsService,
    private readonly businessCardScanService: BusinessCardScanService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, cb) => {
        const allowed =
          ALLOWED_MIME_PREFIXES.some((p) => file.mimetype.startsWith(p)) ||
          ALLOWED_MIME_EXACT.includes(file.mimetype);
        if (allowed) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Unsupported file type'), false);
        }
      },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthedRequest,
    @Body('leadId') leadId?: string,
    @Body('contactId') contactId?: string,
    @Body('touchpointId') touchpointId?: string,
    @Body('caption') caption?: string,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    if (!leadId && !contactId)
      throw new BadRequestException('leadId or contactId is required');
    return this.attachmentsService.upload(
      file,
      { leadId, contactId, touchpointId, caption },
      req.user.id,
    );
  }

  // Business card scan (docs/business-card-scan.md)

  /** Up to 6 photos of one lead's business cards, read together */
  @Post('business-cards')
  @UseInterceptors(
    FilesInterceptor('files', MAX_BUSINESS_CARD_PHOTOS, {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  uploadBusinessCards(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('leadId') leadId: string,
    @Request() req: AuthedRequest,
  ) {
    if (!leadId) throw new BadRequestException('leadId is required');
    return this.attachmentsService.uploadBusinessCards(
      files ?? [],
      leadId,
      req.user.id,
    );
  }

  @Post(':id/business-card-scan/retry')
  retryBusinessCardScan(
    @Param('id') id: string,
    @Request() req: AuthedRequest,
  ) {
    return this.businessCardScanService.retry(id, req.user.id);
  }

  /** For a business card that could be more than one contact: a contact id, or "new" */
  @Post(':id/business-card-scan/match')
  matchBusinessCard(
    @Param('id') id: string,
    @Body('contactId') contactId: string,
    @Request() req: AuthedRequest,
  ) {
    if (!contactId) throw new BadRequestException('contactId is required');
    return this.businessCardScanService.resolveMatch(
      id,
      contactId,
      req.user.id,
    );
  }

  /** A business card for another business: take it as this lead's after all */
  @Post(':id/business-card-scan/add-anyway')
  addBusinessCardAnyway(
    @Param('id') id: string,
    @Request() req: AuthedRequest,
  ) {
    return this.businessCardScanService.addAnyway(id, req.user.id);
  }

  /** Remove a business card: every photo of that person's card */
  @Delete(':id/business-card')
  async removeBusinessCard(@Param('id') id: string) {
    const ids = await this.businessCardScanService.samePersonPhotoIds(id);
    for (const photoId of ids) await this.attachmentsService.remove(photoId);
    return { removed: ids };
  }

  @Get('lead/:leadId')
  findByLead(@Param('leadId') leadId: string) {
    return this.attachmentsService.findByLead(leadId);
  }

  @Get('contact/:contactId')
  findByContact(@Param('contactId') contactId: string) {
    return this.attachmentsService.findByContact(contactId);
  }

  @Patch(':id/caption')
  updateCaption(@Param('id') id: string, @Body('caption') caption: string) {
    return this.attachmentsService.updateCaption(id, caption);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(id);
  }
}
