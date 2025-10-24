import { IsUUID, IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class TaskItemDto {
  @IsUUID()
  articleId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateTaskDto {
  @IsUUID()
  assigneeId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskItemDto)
  items: TaskItemDto[];
}
