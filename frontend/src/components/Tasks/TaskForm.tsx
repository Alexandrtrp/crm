import React from 'react';
import { Form, Input, Select, Button, Card, message } from 'antd';
import { useCreateTaskMutation } from '../../store/taskApi';
import { useGetUsersQuery } from '../../store/userApi';

const { Option } = Select;

type FormData = {
      title: string;
    description: string;
    assigneeId: string;
    dueDate: string;
    status?: string | undefined;
}

export const TaskForm: React.FC = () => {
  const [form] = Form.useForm();
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  const handleSubmit = async (values: FormData) => {
    try {
      await createTask({
        ...values,
        dueDate: values.dueDate || '',
      }).unwrap();

      message.success('Задача успешно создана!');
      form.resetFields();
    } catch (err) {
      message.error('Ошибка при создании задачи');
    }
  };

  return (
    <Card
      title="Создать новую задачу"
      style={{
        maxWidth: 500,
        margin: '1rem auto',
        borderRadius: 10,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Заголовок задачи"
          name="title"
          rules={[{ required: true, message: 'Введите заголовок задачи' }]}
        >
          <Input placeholder="Например: Проверить склад" />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Введите описание задачи' }]}
        >
          <Input.TextArea placeholder="Краткое описание задачи" rows={3} />
        </Form.Item>

        <Form.Item
          label="Исполнитель"
          name="assigneeId"
          rules={[{ required: true, message: 'Выберите исполнителя' }]}
        >
          <Select
            loading={usersLoading}
            placeholder="Выберите исполнителя"
            allowClear
          >
            {users.map((user: any) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
          >
            Создать задачу
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
