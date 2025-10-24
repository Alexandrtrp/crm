import React from 'react';
import { Form, Select, Button, Card, message, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useCreateTaskMutation } from '../../store/taskApi';
import { useGetUsersQuery } from '../../store/userApi';
import { useGetArticlesQuery } from '../../store/articlesApi';

const { Option } = Select;

type FormData = {
  tasks: { articleId: string; quantity: number }[];
  assigneeId: string;
};

export const TaskForm: React.FC = () => {
  const [form] = Form.useForm();
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const { data: articles = [], isLoading: articlesLoading } = useGetArticlesQuery();

const handleSubmit = async (values: FormData) => {
  try {
    await createTask({
      assigneeId: values.assigneeId,
      items: values.tasks,
    }).unwrap();

    message.success('Задача успешно создана!');
    form.resetFields();
  } catch {
    message.error('Ошибка при создании задачи');
  }
};


  return (
    <Card
      style={{
        maxWidth: 600,
        margin: '1rem auto',
        borderRadius: 10,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.List
          name="tasks"
          rules={[
            {
              validator: async (_, tasks) =>
                !tasks || tasks.length < 1
                  ? Promise.reject(new Error('Добавьте хотя бы один артикул'))
                  : Promise.resolve(),
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ display: 'flex', marginBottom: 8 }}
                >
                  <Form.Item
                    {...rest}
                    name={[name, 'articleId']}
                    label="Артикул"
                    rules={[{ required: true, message: 'Выберите артикул' }]}
                  >
                    <Select
                      loading={articlesLoading}
                      placeholder="Выберите артикул"
                      style={{ width: 250 }}
                    >
                      {articles.map((article: TArticle) => (
                        <Option key={article.id} value={article.id}>
                          {article.articleName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...rest}
                    name={[name, 'quantity']}
                    label="Количество"
                    rules={[{ required: true, message: 'Введите количество' }]}
                  >
                    <InputNumber min={1} placeholder="Шт." />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: 'red', marginTop: 30 }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить артикул
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
