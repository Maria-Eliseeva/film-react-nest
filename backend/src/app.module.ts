import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { databaseProvider } from './database/database.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { FilmsController } from './films/films.controller';
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
    OrderModule,
  ],
  controllers: [],
  providers: [
    configProvider,
    databaseProvider,
  ],
})
export class AppModule {}
