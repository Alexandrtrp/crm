import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AddStockDto } from './dto/add-stock.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // @Post()
  // create(@Body() createArticleDto: CreateArticleDto) {
  //   return this.articlesService.create(createArticleDto);
  // }

  @ApiOperation({ summary: 'Получить все артикулы' })
  @ApiResponse({ status: 201, description: 'Артикулы получены' })
  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }

  @ApiOperation({ summary: 'Добавить артикул на склад' })
  @ApiResponse({ status: 201, description: 'Артикул на склад добавлен' })
  @Post('add-stock')
  addStock(@Body() dto: AddStockDto) {
    return this.articlesService.addStock(dto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articlesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articlesService.update(+id, updateArticleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articlesService.remove(+id);
  // }
}
