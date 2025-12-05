import { ApiProperty } from "@nestjs/swagger";

export class StockDto {
  @ApiProperty({ example: 1, description: 'ID склада' })
  warehouseId: number;

  @ApiProperty({ example: 'Склад Москва', description: 'Название склада' })
  warehouse: string;

  @ApiProperty({ example: 150, description: 'Количество на складе' })
  count: number;
}
