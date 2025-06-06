import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Пример: хук для логирования запросов (опционально)
  // constructor() {
  //   super({
  //     log: ['query', 'info', 'warn', 'error'],
  //   });
  // }
}
