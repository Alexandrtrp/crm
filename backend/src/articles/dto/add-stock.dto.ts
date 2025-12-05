import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddStockDto {
  @ApiProperty({
    example: '001d15a0-c0a4-46d6-9484-27010c2f2c94',
    description: 'Id артикула',
  })
  @Type(() => String)
  articleId: string;

  @ApiProperty({
    example: '001d15a0-c0a4-46d6-9484-27010c2f2c94',
    description: 'Id склада',
  })
  @Type(() => String)
  warehouseId: string;

  @ApiProperty({ example: '100', description: 'Количество товара' })
  @Type(() => Number)
  amount: number;
}
