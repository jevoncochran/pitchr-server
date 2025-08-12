import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(['STAFF', 'ADMIN'], { message: 'Valid role required' })
  role: 'STAFF' | 'ADMIN';
}
