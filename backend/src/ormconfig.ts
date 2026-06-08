import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Film } from './entity/Film';
import { Schedule } from './entity/Schedule';

config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_DRIVER as 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'prac',
  entities: [Film, Schedule],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
});
