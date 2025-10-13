import { TaskForm } from '../components/Tasks/TaskForm';
import { TaskList } from '../components/Tasks/TaskList';

export const TaskPage = () => (
  <div style={{ padding: '1rem' }}>
    <TaskForm />
    <TaskList />
  </div>
);
