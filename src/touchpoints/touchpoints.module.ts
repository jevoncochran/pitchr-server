import { Module } from '@nestjs/common';
import { TouchpointsService } from './touchpoints.service';
import { TouchpointsController } from './touchpoints.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TouchpointsController],
  providers: [TouchpointsService],
})
export class TouchpointsModule {}
