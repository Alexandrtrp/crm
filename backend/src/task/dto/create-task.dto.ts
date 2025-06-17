export class CreateTaskDto {
  title: string;
  description: string;
  status?: string; // default to "pending"
  assigneeId: number;
  dueDate: string; // ISO string
}
