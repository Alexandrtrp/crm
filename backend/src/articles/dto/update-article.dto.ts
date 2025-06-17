import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddStockDto } from './add-stock.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => AddStockDto)
  stock?: AddStockDto;
}

