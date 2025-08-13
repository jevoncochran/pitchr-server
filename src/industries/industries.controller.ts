import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { Prisma } from 'generated/prisma';

@Controller('industries')
export class IndustryController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Post()
  create(@Body() createIndustryDto: Prisma.IndustryCreateInput) {
    return this.industriesService.create(createIndustryDto);
  }

  @Get()
  findAll() {
    return this.industriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.industriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndustryDto: Prisma.IndustryUpdateInput,
  ) {
    return this.industriesService.update(id, updateIndustryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.industriesService.remove(id);
  }
}
