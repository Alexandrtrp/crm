export class CreateTaskDto {
  title: string;
  description: string;
  status?: string; 
  assigneeId: string;
  dueDate: string; 
}
