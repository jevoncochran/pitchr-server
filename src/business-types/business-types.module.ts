import { Module } from '@nestjs/common';
import { BusinessTypesService } from './business-types.service';
import { BusinessTypesController } from './business-types.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessTypesController],
  providers: [BusinessTypesService],
})
export class BusinessTypesModule {}
