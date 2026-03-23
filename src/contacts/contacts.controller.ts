import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('api/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() body: any) {
    return this.contactsService.create(body);
  }

  @Get('lead/:leadId')
  findByLead(@Param('leadId') leadId: string) {
    return this.contactsService.findByLead(leadId);
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
