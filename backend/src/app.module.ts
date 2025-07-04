import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ComponentModule } from './component/components.module';
import { ArticlesModule } from './articles/articles.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ComponentModule, ArticlesModule, TaskModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
