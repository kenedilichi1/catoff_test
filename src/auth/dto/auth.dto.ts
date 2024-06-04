import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'kabs ken',
    description: 'full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LogInDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthResponse {
  @ApiProperty({
    example: 'some jwt token',
    description: 'User access token',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty({
    example: 1,
    description: 'User  id',
  })
  @IsNumberString()
  @IsNotEmpty()
  userId: number;
}
