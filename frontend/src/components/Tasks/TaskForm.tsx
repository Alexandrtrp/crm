import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateTaskMutation } from '../../store/taskApi';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState<number>(0);
  const [createTask] = useCreateTaskMutation();
  const { data: users = [] } = useGetUsersQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && assigneeId) {
      await createTask({ title, description, assigneeId });
      setTitle('');
      setDescription('');
      setAssigneeId(0);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Заголовок задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select value={assigneeId} onChange={(e) => setAssigneeId(+e.target.value)}>
        <option value="">Выберите исполнителя</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>
      <Button type="submit">Создать задачу</Button>
    </Form>
  );
};
