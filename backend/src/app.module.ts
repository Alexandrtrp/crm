import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ComponentModule } from './component/components.module';

@Module({
  imports: [PrismaModule, ComponentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
