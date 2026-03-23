import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { Prisma } from '@prisma/client';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Body() createReminderDto: Prisma.ReminderCreateInput) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  findAll() {
    return this.remindersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: Prisma.ReminderUpdateInput,
  ) {
    return this.remindersService.update(id, updateReminderDto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.remindersService.complete(id);
  }

  @Patch(':id/respond')
  respond(@Param('id') id: string, @Body() body: { responded: boolean }) {
    return this.remindersService.respond(id, body.responded);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remindersService.remove(id);
  }
}
