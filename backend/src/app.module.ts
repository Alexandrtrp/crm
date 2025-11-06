import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ComponentModule } from './component/components.module';
import { ArticlesModule } from './articles/articles.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [
    PrismaModule,
    ComponentModule,
    ArticlesModule,
    TaskModule,
    UsersModule,
    AuthModule,
    WarehouseModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
