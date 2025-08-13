import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhoneNumbersService } from './phone-numbers.service';
import { Prisma } from 'generated/prisma';

@Controller('phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}

  @Post()
  create(@Body() createPhoneNumberDto: Prisma.PhoneNumberCreateInput) {
    return this.phoneNumbersService.create(createPhoneNumberDto);
  }

  @Get()
  findAll() {
    return this.phoneNumbersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneNumbersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhoneNumberDto: Prisma.PhoneNumberUpdateInput,
  ) {
    return this.phoneNumbersService.update(id, updatePhoneNumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneNumbersService.remove(id);
  }
}
