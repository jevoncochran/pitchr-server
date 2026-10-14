import { Module } from '@nestjs/common';
import { TouchpointsService } from './touchpoints.service';
import { TouchpointsController } from './touchpoints.controller';
import { TouchpointLoggingService } from './touchpoint-logging.service';
import { DatabaseModule } from 'src/database/database.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [TouchpointsController],
  providers: [TouchpointsService, TouchpointLoggingService],
  exports: [TouchpointLoggingService],
})
export class TouchpointsModule {}
