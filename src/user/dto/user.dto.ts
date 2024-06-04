import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456789',
    description: 'user password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'user full name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateUser {
  @IsNumberString()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'name',
    description: 'field to be updated',
  })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'the value for the field',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class User {
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  id: number;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'user full name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2024-06-12',
    description: 'date of user creation',
  })
  @IsString()
  @IsNotEmpty()
  create_time: Date;
}
