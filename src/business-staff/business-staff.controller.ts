import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessStaffService } from './business-staff.service';
import { Prisma } from 'generated/prisma';

@Controller('business-staff')
export class BusinessStaffController {
  constructor(private readonly businessStaffService: BusinessStaffService) {}

  @Post()
  create(@Body() createBusinessStaffDto: Prisma.BusinessStaffCreateInput) {
    return this.businessStaffService.create(createBusinessStaffDto);
  }

  @Get()
  findAll() {
    return this.businessStaffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessStaffService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessStaffDto: Prisma.BusinessStaffUpdateInput,
  ) {
    return this.businessStaffService.update(id, updateBusinessStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessStaffService.remove(id);
  }
}
