import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserEntity {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
