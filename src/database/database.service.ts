import { Injectable, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from 'src/generated/prisma';

// Load .env from the project root explicitly so Prisma always finds DATABASE_URL
// regardless of where the generated client ends up after compilation
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
