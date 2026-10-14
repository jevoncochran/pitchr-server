import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ReplyInput } from 'src/touchpoints/touchpoint-response';
import { Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Delete('clear-all')
  clearAll() {
    return this.tasksService.clearAll();
  }

  @Patch('dismiss-overdue')
  dismissOverdue() {
    return this.tasksService.dismissOverdue();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Prisma.TaskUpdateInput,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.complete(id);
  }

  @Patch(':id/respond')
  // For a check-in about a message, "responded" also sends what they said (reply)
  respond(
    @Param('id') id: string,
    @Body() body: { responded: boolean; reply?: ReplyInput },
  ) {
    return this.tasksService.respond(id, body.responded, body.reply);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
