import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { SessionItemStatus } from '@prisma/client';
import {
  CreateSessionInput,
  SessionUser,
  SessionsService,
  UpdateSessionInput,
} from './sessions.service';
import {
  LogSessionItemInput,
  SessionLoggingService,
} from './session-logging.service';
import {
  OptimizeRouteInput,
  RoutePlanningService,
} from './route-planning.service';
import { DebriefInput, VisitDebriefService } from './visit-debrief.service';

type AuthedRequest = { user: SessionUser };

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly sessionLoggingService: SessionLoggingService,
    private readonly routePlanningService: RoutePlanningService,
    private readonly visitDebriefService: VisitDebriefService,
  ) {}

  @Post()
  create(@Body() input: CreateSessionInput, @Request() req: AuthedRequest) {
    return this.sessionsService.create(input, req.user);
  }

  // ?all=true lists everyone's sessions (admins only; others get their own)
  @Get()
  findAll(@Query('all') all: string, @Request() req: AuthedRequest) {
    return this.sessionsService.findAll(req.user, all === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthedRequest) {
    return this.sessionsService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() input: UpdateSessionInput,
    @Request() req: AuthedRequest,
  ) {
    return this.sessionsService.update(id, input, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthedRequest) {
    return this.sessionsService.remove(id, req.user);
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Request() req: AuthedRequest) {
    return this.sessionsService.start(id, req.user);
  }

  // "Fill in" (docs/visit-debrief.md): a dictated note becomes a proposal for
  // the visit form. Saves the note and proposal; nothing on the lead changes.
  @Post(':id/debrief')
  debrief(
    @Param('id') id: string,
    @Body() input: DebriefInput,
    @Request() req: AuthedRequest,
  ) {
    return this.visitDebriefService.debrief(id, input, req.user);
  }

  // Log one lead: a planned item (itemId), or an unplanned / quick-added lead
  @Post(':id/log')
  log(
    @Param('id') id: string,
    @Body() input: LogSessionItemInput,
    @Request() req: AuthedRequest,
  ) {
    return this.sessionLoggingService.log(id, input, req.user);
  }

  @Post(':id/end')
  end(@Param('id') id: string, @Request() req: AuthedRequest) {
    return this.sessionsService.end(id, req.user);
  }

  @Post(':id/items')
  addItems(
    @Param('id') id: string,
    @Body() body: { leadIds: string[] },
    @Request() req: AuthedRequest,
  ) {
    return this.sessionsService.addItems(id, body.leadIds, req.user);
  }

  // Put the planned stops in the fastest driving order (one Google Routes call)
  @Post(':id/route')
  optimizeRoute(
    @Param('id') id: string,
    @Body() input: OptimizeRouteInput,
    @Request() req: AuthedRequest,
  ) {
    return this.routePlanningService.optimize(id, input, req.user);
  }

  @Put(':id/items/order')
  reorderItems(
    @Param('id') id: string,
    @Body() body: { itemIds: string[] },
    @Request() req: AuthedRequest,
  ) {
    return this.sessionsService.reorderItems(id, body.itemIds, req.user);
  }

  @Patch(':id/items/:itemId')
  setItemStatus(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() body: { status: SessionItemStatus },
    @Request() req: AuthedRequest,
  ) {
    return this.sessionsService.setItemStatus(
      id,
      itemId,
      body.status,
      req.user,
    );
  }

  @Delete(':id/items/:itemId')
  removeItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Request() req: AuthedRequest,
  ) {
    return this.sessionsService.removeItem(id, itemId, req.user);
  }
}
