import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskStatus } from './dto/update-task-status.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto, creatorId: string): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: 'TODO',
        assigneeId: dto.assigneeId,
        creatorId,
      },
      include: { assignee: true },
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        assignee: true,
      },
    });
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
      include: { assignee: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: string, dto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
