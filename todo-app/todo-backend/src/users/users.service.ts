import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/shared/entites/user.entity';
import { UsersError, UsersErrorMessages } from './errors';
import { verify } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}

  public async createUser({ name, password }: RegisterDto) {
    const query = `
            INSERT INTO User (user_name, user_password)
            VALUES (?, ?)
            RETURNING user_id, user_name;
    `;


    const result = await this.database.execute<Omit<User, 'user_password'>>(query, [name, password]);

    if (result.length !== 1) {
      throw new UsersError(500, UsersErrorMessages.User_Not_Created);
    }

    return result[0];
  }

  public async findUser(by: 'id', value: number): Promise<User | null>;
  public async findUser(by: 'name', value: string): Promise<User | null>;
  public async findUser(
    by: 'id' | 'name',
    value: string | number,
  ): Promise<User | null> {
    const searchKey = by === 'id' ? 'user_id' : 'user_name';
    const query = `
        SELECT * FROM User WHERE ${searchKey} = ?;
    `;
    const result = await this.database.execute<User>(query, [value]);

    if (result.length !== 1) {
      return null;
    }

    return result[0];
  }

  public async validateUserPassword({ password, userId }: {
    password: string;
    userId: number;
  }) {
    const query = `
        SELECT user_password FROM User WHERE user_id = ?;
    `;

    const result = await this.database.execute<{ user_password: string }>(query, [userId]);

    if (result.length !== 1) {
      return false;
    }

    const isPasswordValid = await verify(result[0].user_password, password);

    return isPasswordValid;
  }
}
