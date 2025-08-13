import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(role?: 'STAFF' | 'ADMIN') {
    if (role) {
      const usersArr = await this.databaseService.user.findMany({
        where: { role },
      });
      if (usersArr.length === 0) {
        throw new NotFoundException(
          'No users with the specified role were found',
        );
      } else {
        return usersArr;
      }
    }

    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.databaseService.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: string) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
