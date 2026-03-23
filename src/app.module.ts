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
import { LocationsModule } from './locations/locations.module';
import { PhoneNumbersModule } from './phone-numbers/phone-numbers.module';
import { AuthModule } from './auth/auth.module';
import { RemindersModule } from './reminders/reminders.module';
import { ContactsModule } from './contacts/contacts.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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
    LocationsModule,
    PhoneNumbersModule,
    AuthModule,
    RemindersModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
