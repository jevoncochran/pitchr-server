import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { LeadsModule } from './leads/leads.module';
import { IndustriesModule } from './industries/industries.module';

@Module({
  imports: [UsersModule, DatabaseModule, LeadsModule, IndustriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
