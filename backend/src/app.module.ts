import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { databaseProvider } from './database/database.provider';
import { FilmsModule } from './films/films.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { FilmsMongoDbRepository } from './repository/films/films';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    FilmsModule,
  ],
  controllers: [OrderController],
  providers: [
    configProvider,
    databaseProvider,
    OrderService,
    FilmsMongoDbRepository,
  ],
})
export class AppModule {}
