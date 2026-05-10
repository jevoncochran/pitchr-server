import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() body: any) {
    return this.contactsService.create(body);
  }

  @Get()
  findAll(@Query('filter') filter: 'all' | 'standalone' = 'standalone') {
    return this.contactsService.findAll(filter);
  }

  @Get('lead/:leadId')
  findByLead(@Param('leadId') leadId: string) {
    return this.contactsService.findByLead(leadId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Post(':id/touchpoints')
  logTouchpoint(
    @Param('id') id: string,
    @Body() body: { type: string; notes?: string; date?: string },
  ) {
    return this.contactsService.logTouchpoint(id, body as any);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.contactsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
