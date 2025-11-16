import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { count } from 'console';
import { AddStockDto } from './dto/add-stock.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async findAll() {
    const articles = await this.prisma.article.findMany({
      include: {
        stocks: {
          include: {
            warehouse: true,
          },
        },
        components: {
          include: {
            component: true, 
          },
        },
      },
    });
    return articles.map((article) => ({
      id: article.id,
      articleName: article.name,
      stocks: article.stocks.map((stock) => ({
        warehouseId: stock.warehouse.id,
        warehouse: stock.warehouse.name,
        count: stock.count,
      })),
      components: article.components.map((ac) => ({
        componentId: ac.component.id,
        componentName: ac.component.name,
        quantityPerArticle: ac.quantity,
      })),
    }));
  }

  async addStock(dto: AddStockDto) {
    const { articleId, warehouseId, amount } = dto;
    return this.prisma.articleStock.upsert({
      where: {
        articleId_warehouseId: {
          articleId: articleId,
          warehouseId: warehouseId,
        },
      },
      update: {
        count: {
          increment: amount,
        },
      },
      create: {
        articleId: articleId,
        warehouseId: warehouseId,
        count: amount,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
