import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { SessionLoggingService } from './session-logging.service';
import { RoutePlanningService } from './route-planning.service';
import { TouchpointsModule } from 'src/touchpoints/touchpoints.module';

@Module({
  imports: [DatabaseModule, TouchpointsModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionLoggingService, RoutePlanningService],
})
export class SessionsModule {}
