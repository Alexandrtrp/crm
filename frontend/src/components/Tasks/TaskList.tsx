import React from 'react';
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '../../store/taskApi';

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateStatus] = useUpdateTaskStatusMutation();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <ul>
      {tasks?.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Исполнитель: {task.assignee.name}</p>
          <p>Статус: {task.status}</p>
          <button
            onClick={() => updateStatus({ id: task.id, status: 'done' })}
          >
            Отметить как выполнено
          </button>
        </li>
      ))}
    </ul>
  );
};
