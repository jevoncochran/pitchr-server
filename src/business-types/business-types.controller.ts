import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessTypesService } from './business-types.service';
import { Prisma } from 'generated/prisma';

@Controller('business-types')
export class BusinessTypesController {
  constructor(private readonly businessTypesService: BusinessTypesService) {}

  @Post()
  create(@Body() createBusinessTypeDto: Prisma.BusinessTypeCreateInput) {
    return this.businessTypesService.create(createBusinessTypeDto);
  }

  @Get()
  findAll() {
    return this.businessTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessTypeDto: Prisma.BusinessTypeUpdateInput,
  ) {
    return this.businessTypesService.update(id, updateBusinessTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessTypesService.remove(id);
  }
}
