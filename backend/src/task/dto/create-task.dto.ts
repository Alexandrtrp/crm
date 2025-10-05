export class CreateTaskDto {
  title: string;
  description: string;
  status?: string; // default to "pending"
  assigneeId: string;
  dueDate: string; // ISO string
}
