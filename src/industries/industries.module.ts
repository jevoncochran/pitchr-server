import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustryController } from './industries.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [IndustryController],
  providers: [IndustriesService],
})
export class IndustriesModule {}
