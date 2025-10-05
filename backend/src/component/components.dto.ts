import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// DTO для склада
export class WarehouseDto {
  @ApiProperty({ example: 1, description: 'ID склада' })
  id: string;

  @ApiProperty({ example: 'Основной склад', description: 'Название склада' })
  name: string;

  @ApiProperty({ 
    example: 'Москва, ул. Ленина, 1', 
    description: 'Местоположение склада',
    required: false 
  })
  location?: string;
}

// DTO для информации о наличии компонента на складе
export class ComponentStockDto {
  @ApiProperty({ example: 1, description: 'ID записи о наличии' })
  id: string;

  @ApiProperty({ example: 5, description: 'Количество компонентов на складе' })
  count: number;

  @ApiProperty({ type: WarehouseDto, description: 'Информация о складе' })
  @Type(() => WarehouseDto)
  warehouse: WarehouseDto;
}

// Основной DTO для компонента
export class ComponentDto {
  @ApiProperty({ example: 1, description: 'ID компонента' })
  id: string;

  @ApiProperty({ 
    example: 'Резистор 10кОм', 
    description: 'Уникальное название компонента' 
  })
  name: string;

  @ApiProperty({ 
    type: [ComponentStockDto],
    description: 'Информация о наличии на складах' 
  })
  @Type(() => ComponentStockDto)
  componentsInStock: ComponentStockDto[];
}