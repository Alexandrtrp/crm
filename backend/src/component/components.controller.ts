import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ComponentsService } from './components.service';
import { ComponentDto, ComponentStockDto } from './components.dto';

@ApiTags('Components')
@Controller('components')
export class ComponentsController {
  constructor(private readonly componentService: ComponentsService) {}

  @Get()
  @ApiOkResponse({ 
    type: [ComponentStockDto],
    description: 'Список всех компонентов с информацией о наличии на складах' 
  })
  async getAll(): Promise<ComponentDto[]> {
    return this.componentService.getAllComponentsWithStock();
  }
}