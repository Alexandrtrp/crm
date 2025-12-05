import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { BaseComponentDto } from './base-component.dto';
import { StockDto } from 'src/warehouse/dto/stock.dto';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Bit-001',
    description: 'Название  артикула',
  })
  @Type(() => String)
  @IsOptional()
  name: string;

  @ApiProperty({
    type: [BaseComponentDto],
    description: 'Базовые компоненты артикула',
  })
  @ValidateNested({ each: true })
  @Type(() => BaseComponentDto)
  @IsOptional()
  baseComponents: BaseComponentDto[];

  @ApiProperty({
    type: [StockDto],
    description: 'Остатки на складах',
  })
  @ValidateNested({ each: true })
  @Type(() => StockDto)x
  @IsOptional()
  stocks?: StockDto[];
}
