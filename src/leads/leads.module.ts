import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadSnapshotService } from './lead-snapshot.service';
import { LeadsController } from './leads.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LeadsController],
  providers: [LeadsService, LeadSnapshotService],
})
export class LeadsModule {}
