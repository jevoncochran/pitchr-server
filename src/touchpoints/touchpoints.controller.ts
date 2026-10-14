import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TouchpointsService } from './touchpoints.service';
import {
  LogTouchpointInput,
  TouchpointLoggingService,
} from './touchpoint-logging.service';
import { ReplyInput } from './touchpoint-response';
import { TasksService } from 'src/tasks/tasks.service';
import { Prisma } from '@prisma/client';

@Controller('touchpoints')
export class TouchpointsController {
  constructor(
    private readonly touchpointsService: TouchpointsService,
    private readonly touchpointLoggingService: TouchpointLoggingService,
    private readonly tasksService: TasksService,
  ) {}

  // Record a reply to a DM, email or text at any time (answers its check-in if still open)
  @Patch(':id/response')
  recordReply(@Param('id') id: string, @Body() reply: ReplyInput) {
    return this.tasksService.recordReply(id, reply);
  }

  // Log a touchpoint for a lead and apply the follow-up sequence rules, all at once
  @Post('log')
  log(
    @Body() input: LogTouchpointInput,
    @Request() req: { user: { id: string } },
  ) {
    return this.touchpointLoggingService.logTouchpoint(input, req.user.id);
  }

  @Post()
  create(@Body() createTouchpointDto: Prisma.TouchPointCreateInput) {
    return this.touchpointsService.create(createTouchpointDto);
  }

  @Get()
  findAll() {
    return this.touchpointsService.findAll();
  }

  @Get('stats/outreach')
  outreachStats() {
    return this.touchpointsService.outreachStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touchpointsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTouchpointDto: Prisma.TouchPointUpdateInput,
  ) {
    return this.touchpointsService.update(id, updateTouchpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touchpointsService.remove(id);
  }
}
