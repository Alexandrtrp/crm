import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

@Post()
@UseGuards(JwtAuthGuard)
create(@Body() dto: CreateTaskDto, @Req() req) {
  console.log(req.user); 
  const creatorId = req.user.id;
  return this.taskService.create(dto, creatorId);
}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
    return this.taskService.updateStatus(id, dto.status);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskService.remove(+id);
  // }
}
