import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { Prisma } from '@prisma/client';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Post()
  create(@Body() createSignalDto: Prisma.SignalCreateInput) {
    return this.signalsService.create(createSignalDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSignalDto: Prisma.SignalUpdateInput,
  ) {
    return this.signalsService.update(id, updateSignalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signalsService.remove(id);
  }
}
