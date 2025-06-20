import React from 'react';
import styled from 'styled-components';
import { TaskCard } from './TaskCard';
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '../../store/taskApi';

const ListWrapper = styled.div`
  padding: 1rem;
`;

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateStatus] = useUpdateTaskStatusMutation();

  const handleComplete = (id: number) => {
    updateStatus({ id, status: 'done' });
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <ListWrapper>
      {tasks?.map((task: TTask) => (
        <TaskCard key={task.id} task={task} onComplete={handleComplete} />
      ))}
    </ListWrapper>
  );
};