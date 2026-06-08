import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsMongoDbRepository } from '../repository/films/films';
import { databaseProvider } from '../database/database.provider';
import { configProvider } from '../app.config.provider';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    FilmsMongoDbRepository,
    databaseProvider,
    configProvider,
  ],
})
export class OrderModule {}