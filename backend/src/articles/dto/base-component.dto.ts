import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BaseComponentDto {
  @ApiProperty({ example: '001d15a0-c0a4-46d6-9484-27010c2f2c94', description: 'ID компонента' })
  componentId: string;

  @ApiProperty({ example: 'Дисплей', description: 'Название компонента' })
  componentName: string;

  @ApiProperty({ example: 2, description: 'Количество на 1 артикул' })
  quantityPerArticle: number;
}
