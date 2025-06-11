import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ComponentDto } from './components.dto';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService) {}

  async getAllComponentsWithStock(): Promise<ComponentDto[]> {
    const components = await this.prisma.component.findMany({
      include: {
        componentsInStock: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    return components.map(component => ({
      id: component.id,
      name: component.name,
      componentsInStock: component.componentsInStock.map(stock => ({
        id: stock.id,
        count: stock.count,
        warehouse: {
          id: stock.warehouse.id,
          name: stock.warehouse.name,
          location: stock.warehouse.location ?? undefined,
        },
      })),
    }));
  }
}