import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.warehouse.findMany({
      where: {
        location: 'Russia',
      },
    });
  }
}
