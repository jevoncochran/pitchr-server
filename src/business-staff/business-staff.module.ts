import { Module } from '@nestjs/common';
import { BusinessStaffService } from './business-staff.service';
import { BusinessStaffController } from './business-staff.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessStaffController],
  providers: [BusinessStaffService],
})
export class BusinessStaffModule {}
