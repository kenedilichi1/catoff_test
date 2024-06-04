import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, LogInDto, SignUpDto } from './dto/auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Sign up successful',
    type: AuthResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  async signup(@Body() signInDto: SignUpDto) {
    return this.authService.signUp(signInDto);
  }

  @ApiResponse({
    status: 200,
    description: 'login successful',
    type: AuthResponse,
  })
  @Post('/login')
  async login(@Body() logInDto: LogInDto) {
    return this.authService.signIn(logInDto);
  }
}
