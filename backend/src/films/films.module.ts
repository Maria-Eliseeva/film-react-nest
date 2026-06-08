import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsTypeOrmRepository } from '../repository/films/films';
import { configProvider } from '../app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entity/Film';
import { Schedule } from '../entity/Schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsTypeOrmRepository, configProvider],
})
export class FilmsModule {}
