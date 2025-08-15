import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { Prisma } from 'generated/prisma';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createLeadDto: Prisma.LeadCreateInput) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Get('post-visit')
  // Leads that have been visited in person and now require immediate follow-up
  findPostVisitLeads() {
    return this.leadsService.findPostVisitLeads();
  }

  // Leads that have not been contacted in 7 days or more
  @Get('estranged')
  findEstrangedLeads() {
    return this.leadsService.findEstrangedLeads();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadDto: Prisma.LeadUpdateInput,
  ) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
