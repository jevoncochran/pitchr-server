import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LeadsModule } from './leads/leads.module';
import { IndustriesModule } from './industries/industries.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BusinessTypesModule } from './business-types/business-types.module';
import { NotesModule } from './notes/notes.module';
import { TouchpointsModule } from './touchpoints/touchpoints.module';
import { PositionsModule } from './positions/positions.module';
import { StaffModule } from './staff/staff.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    LeadsModule,
    IndustriesModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },
      { name: 'long', ttl: 60000, limit: 100 },
    ]),
    BusinessTypesModule,
    NotesModule,
    TouchpointsModule,
    PositionsModule,
    StaffModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
