import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsMongoDbRepository } from '../repository/films/films';
import { databaseProvider } from '../database/database.provider';
import { configProvider } from '../app.config.provider';

@Module({
  controllers: [FilmsController],
  providers: [
    FilmsService,
    FilmsMongoDbRepository,
    databaseProvider,
    configProvider,
  ],
})
export class FilmsModule {}
