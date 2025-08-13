import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createNoteDto: Prisma.NoteCreateInput) {
    return this.databaseService.note.create({ data: createNoteDto });
  }

  async findAll() {
    return this.databaseService.note.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.note.findUnique({ where: { id } });
  }

  async update(id: string, updateNoteDto: Prisma.NoteUpdateInput) {
    return this.databaseService.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.note.delete({ where: { id } });
  }
}
