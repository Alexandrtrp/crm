import { Type } from 'class-transformer';

export class AddStockDto {
  @Type(() => Number)
  articleId: number;

  @Type(() => Number)
  warehouseId: number;

  @Type(() => Number)
  amount: number;
}
