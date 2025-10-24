import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task, TaskStatus } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto, creatorId: string) {
    return this.prisma.task.create({
      data: {
        status: TaskStatus.TODO,
        assigneeId: dto.assigneeId,
        creatorId,
        items: {
          create: dto.items.map((item) => ({
            articleId: item.articleId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        assignee: true,
        items: { include: { article: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        assignee: true,
        items: { include: { article: true } },
      },
      orderBy: { createdAt: 'desc' },
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
