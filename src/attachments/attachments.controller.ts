import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AttachmentsService } from './attachments.service';

const ALLOWED_MIME_PREFIXES = ['image/', 'video/'];
const ALLOWED_MIME_EXACT = ['application/pdf'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

@Controller('api/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

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
    @Body('leadId') leadId: string,
    @Body('touchpointId') touchpointId?: string,
    @Body('caption') caption?: string,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    if (!leadId) throw new BadRequestException('leadId is required');
    return this.attachmentsService.upload(file, leadId, touchpointId, caption);
  }

  @Get('lead/:leadId')
  findByLead(@Param('leadId') leadId: string) {
    return this.attachmentsService.findByLead(leadId);
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
