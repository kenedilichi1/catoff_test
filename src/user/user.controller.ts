import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUser, User } from './dto/user.dto';
import { AuthGuard } from 'src/auth/guard/authGuard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 201,
    description: 'created user',
    type: User,
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'This os the information of a new user',
  })
  @Post('/create-user')
  async addUser(user: CreateUserDto) {
    return await this.userService.addUser(user);
  }

  @ApiResponse({
    status: 200,
    description:
      'Fetched the data of the current logged in user, extracting the user id from the users access token',
    type: User,
  })
  @UseGuards(AuthGuard)
  @Get('/user')
  async getUser(@Request() req) {
    return await this.userService.getUserWithId(req.userId);
  }

  @ApiResponse({
    status: 200,
    description: 'fetched all users',
    type: [User],
  })
  @Get('/users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @ApiResponse({
    status: 200,
    description:
      'Updated the user table using the id of the currently logged in user extracted from the access token',
  })
  @ApiBody({ type: UpdateUser })
  @UseGuards(AuthGuard)
  @Patch('/update')
  async updateUser(
    @Body() updateDto: Omit<UpdateUser, 'userId'>,
    @Request() req,
  ) {
    return await this.userService.updateUser({
      ...updateDto,
      userId: req.userId,
    });
  }

  @ApiResponse({
    status: 200,
    description:
      'Deleted row from the user table using the id of the currently logged in user extracted from the access token',
  })
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async deleteUser(@Request() req) {
    return await this.userService.deleteUser(req.userId);
  }
}
