import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { BusinessCardScanService } from './business-card-scan.service';
import { BusinessCardsController } from './business-cards.controller';
import { BusinessCardsService } from './business-cards.service';
import { DatabaseModule } from 'src/database/database.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [AttachmentsController, BusinessCardsController],
  providers: [
    AttachmentsService,
    BusinessCardScanService,
    BusinessCardsService,
  ],
})
export class AttachmentsModule {}
