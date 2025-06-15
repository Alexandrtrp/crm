import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { count } from 'console';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService){}
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async findAll() {
    const articles = await this.prisma.article.findMany({
      include: {
        stocks: {
          include: {
            warehouse: true,
          }
        }
      }
    })
    return articles.map((article)=>({
      id: article.id,
      articleName: article.name,
      stocks: article.stocks.map((stock)=>({
        warehouse: stock.warehouse.name,
        count: stock.count,
      }))
    }));
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
