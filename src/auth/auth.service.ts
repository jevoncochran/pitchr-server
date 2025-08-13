import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Incorrect email or passwordd');
    }

    const correctPassword = await bcrypt.compare(pass, user.password);

    if (!correctPassword) {
      throw new NotFoundException('Incorrect email of password');
    }

    if (user && correctPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: Prisma.UserCreateInput) {
    const { firstName, lastName, email, password, role } = registerUserDto;

    const userExists = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hash = bcrypt.hashSync(password, 8);

    return this.databaseService.user.create({
      data: { firstName, lastName, email, password: hash, role },
    });
  }
}
