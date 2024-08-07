import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './modules/products/products.module';
import typeorm from './config/typeorm';
import { OrderModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/users.controller';
import { ProductsController } from './modules/products/products.controller';
import { OrdersController } from './modules/orders/orders.controller';
import { AuthController } from './modules/auth/auth.controller';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ProductModule,
    OrderModule,
    UsersModule,
    AuthModule,
    WebSocketModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ProductsController,
    OrdersController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
