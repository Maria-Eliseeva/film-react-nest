import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsTypeOrmRepository } from '../repository/films/films';
import { configProvider } from '../app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entity/Film';
import { Schedule } from '../entity/Schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService, FilmsTypeOrmRepository, configProvider],
})
export class OrderModule {}
