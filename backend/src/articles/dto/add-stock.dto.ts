import { Type } from 'class-transformer';

export class AddStockDto {
  @Type(() => String)
  articleId: string;

  @Type(() => String)
  warehouseId: string;

  @Type(() => Number)
  amount: number;
}
