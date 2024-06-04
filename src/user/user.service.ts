import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdateUser } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { User } from './types/user.types';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async addUser(userDto: CreateUserDto): Promise<User> {
    try {
      const text =
        'INSERT INTO users(name, email, password, create_time) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [
        userDto.name,
        userDto.email,
        userDto.password,
        new Date(),
      ];

      const saveUser = await this.dbService.executeQuery(text, values);

      const { id, email, name } = saveUser[0] as UserEntity;
      return { id, email, name };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserWithEmail(userEmail: string) {
    try {
      const text = 'SELECT * FROM users WHERE email = $1';
      const values = [userEmail];

      const user = await this.dbService.executeQuery(text, values);

      if (user.length === 0) {
        throw new NotFoundException();
      }
      const { id, email, name, password } = user[0] as UserEntity;
      return { id, email, name, password };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserWithId(userId: number) {
    try {
      const text = 'SELECT * FROM users WHERE id = $1';
      const values = [userId];

      const user = await this.dbService.executeQuery(text, values);

      const { id, email, name } = user[0] as UserEntity;
      return { id, email, name };
    } catch (error) {
      throw new Error();
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const text = 'SELECT * FROM users';

      const getUsers = await this.dbService.executeQuery(text);

      if (getUsers.length === 0) {
        return [];
      }

      const users = getUsers.map((user) => {
        const { id, email, name } = user as UserEntity;
        return { id, email, name };
      });

      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(data: UpdateUser) {
    try {
      const text = `UPDATE users SET ${data.field} = $1 WHERE id = $2`;
      const value = [data.value, data.userId];

      const update = await this.dbService.executeQuery(text, value);

      const updated = update[0] === 1 ? true : false;
      return updated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: string) {
    try {
      const text = 'DELETE FROM users WHERE id = $1';
      const value = [userId];

      const deleteUser = await this.dbService.executeQuery(text, value);

      console.log(deleteUser);
      return deleteUser[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
