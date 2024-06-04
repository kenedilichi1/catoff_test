import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LogInDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignUpDto) {
    const hashed = await argon2.hash(signupDto.password);

    const email = signupDto.email.toLowerCase();
    const user = await this.usersService.addUser({
      name: signupDto.name,
      password: hashed,
      email,
    });

    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }

  async signIn(logInDto: LogInDto) {
    const hashed = await argon2.hash(logInDto.password);

    const email = logInDto.email.toLowerCase();
    const user = await this.usersService.getUserWithEmail(email);

    const verifyPass = await argon2.verify(user.password, logInDto.password);

    if (!verifyPass) {
      throw new InternalServerErrorException('invalid email or password');
    }

    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }
}
