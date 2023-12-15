import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    const queryRunner = this.dataSource.createQueryRunner();

    const CREATE_USER_TABLE_QUERY = `
            CREATE TABLE IF NOT EXISTS User (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name VARCHAR(255) UNIQUE NOT NULL,
                user_password VARCHAR(255) NOT NULL
            );
        `;

    const CREATE_TASK_TABLE_QUERY = `
            CREATE TABLE IF NOT EXISTS Task (
                task_id VARCHAR(255) PRIMARY KEY,
                task_title VARCHAR(255) NOT NULL,
                task_description TEXT NOT NULL,
                task_status VARCHAR(255) NOT NULL DEFAULT 'open',
                task_deadline DATETIME,
                task_deleted INTEGER NOT NULL DEFAULT 0,
                task_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                task_user_id INTEGER NOT NULL
            );
        `;

    const CREATE_TASK_TABLE_INDEX_QUERY = `
                CREATE INDEX IF NOT EXISTS task_user_id_index ON Task (task_user_id);
        `;

    try {
      await queryRunner.query(CREATE_USER_TABLE_QUERY);
      await queryRunner.query(CREATE_TASK_TABLE_QUERY);
      await queryRunner.query(CREATE_TASK_TABLE_INDEX_QUERY);
    } catch (error) {
      console.error('Error while creating tables', error);
    } finally {
      await queryRunner.release();
    }
  }

  public async execute<T>(query: string, params: unknown[] = []): Promise<T[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const result = await queryRunner.query(query, params);
      return result;
    } finally {
      await queryRunner.release();
    }
  }
}
