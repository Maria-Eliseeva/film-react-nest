import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Film } from './entity/Film';
import { Schedule } from './entity/Schedule';

config();

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_DRIVER as 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE || 'prac',
  entities: [Film, Schedule],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: process.env.NODE_ENV !== 'production',
});
