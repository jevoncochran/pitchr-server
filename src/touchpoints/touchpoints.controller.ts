import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TouchpointsService } from './touchpoints.service';
import { Prisma } from 'generated/prisma';

@Controller('touchpoints')
export class TouchpointsController {
  constructor(private readonly touchpointsService: TouchpointsService) {}

  @Post()
  create(@Body() createTouchpointDto: Prisma.TouchPointCreateInput) {
    return this.touchpointsService.create(createTouchpointDto);
  }

  @Get()
  findAll() {
    return this.touchpointsService.findAll();
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
