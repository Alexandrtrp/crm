import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const Text = styled.p`
  margin: 0.25rem 0;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

type Props = {
  task: TTask;
  onComplete: (id: number) => void;
};

export const TaskCard: React.FC<Props> = ({ task, onComplete }) => (
  <Card>
    <Title>{task.title}</Title>
    <Text>{task.description}</Text>
    <Text>Исполнитель: {task.assignee.name}</Text>
    <Text>Статус: {task.status}</Text>
    {task.status !== 'done' && (
      <Button onClick={() => onComplete(task.id)}>Отметить как выполнено</Button>
    )}
  </Card>
);