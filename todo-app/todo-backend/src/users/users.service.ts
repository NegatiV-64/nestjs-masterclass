import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/shared/entites/user.entity';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}

  public async findUser(by: 'id', value: number): Promise<User | null>;
  public async findUser(by: 'name', value: string): Promise<User | null>;
  public async findUser(
    by: 'id' | 'name',
    value: string | number,
  ): Promise<User | null> {
    const searchKey = by === 'id' ? 'user_id' : 'user_name';
    const query = `
        SELECT * FORM User WHERE ${searchKey} = ?;
    `;
    const result = await this.database.execute<User>(query, [value]);

    if (result.length !== 1) {
      return null;
    }

    return result[0];
  }
}
