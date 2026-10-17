import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MAX_BUSINESS_CARD_PHOTOS } from './attachments.service';
import { BusinessCardsService } from './business-cards.service';

type AuthedRequest = { user: { id: string } };

// A phone photo is a few MB; anything this big isn't a business card photo
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// Add Lead's "Fill in from business card" (docs/business-card-scan.md)
@Controller('business-cards')
export class BusinessCardsController {
  constructor(private readonly businessCardsService: BusinessCardsService) {}

  /**
   * Up to 6 photos, read while the owner waits. `attachmentIds` are photos
   * already read for the same form, read again together with the new ones.
   */
  @Post('read')
  @UseInterceptors(
    FilesInterceptor('files', MAX_BUSINESS_CARD_PHOTOS, {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  read(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('attachmentIds') attachmentIds?: string | string[],
  ) {
    const earlier = [attachmentIds ?? []].flat().filter(Boolean);
    return this.businessCardsService.readForNewLead(files ?? [], earlier);
  }

  /** "Add this business card there": `attachmentIds` go on that lead */
  @Post('add-to-lead')
  addToLead(
    @Body('attachmentIds') attachmentIds: string[],
    @Body('leadId') leadId: string,
    @Request() req: AuthedRequest,
  ) {
    if (!leadId) throw new BadRequestException('leadId is required');
    return this.businessCardsService.addToLead(
      attachmentIds ?? [],
      leadId,
      req.user.id,
    );
  }
}
