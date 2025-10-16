export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export class UpdateTaskStatusDto {
  status: TaskStatus;
}