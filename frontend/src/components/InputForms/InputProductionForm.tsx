import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import { useGetWarehousesQuery } from '../../store/warehouseApi';
import { useGetArticlesQuery } from '../../store/articlesApi';
import { useGetUsersQuery } from '../../store/userApi';

export const InputProductionForm = () => {
  const [form] = Form.useForm();
  const { data: articles = [], isLoading: componentsLoading } = useGetArticlesQuery();
  const { data: warehouses = [], isLoading: warehousesLoading } = useGetWarehousesQuery();
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  const handleSubmit = async (values: FormData) => {};

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
        <Form.Item
          name="date"
          label="Дата закупки"
          rules={[{ required: true, message: 'Введите дату' }]}
        >
          <DatePicker placeholder="Выбрать дату" style={{ width: 250 }} format="DD.MM.YYYY" />
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
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item
          name="warehouseId"
          label="Склад"
          rules={[{ required: true, message: 'Выберите склад' }]}
        >
          <Select
            loading={warehousesLoading}
            placeholder="Выбрать склад"
            options={warehouses.map((warehouse) => ({
              value: warehouse.id,
              label: warehouse.name,
            }))}
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.List
          name="articles"
          rules={[
            {
              validator: async (_, components) =>
                !components || components.length < 1
                  ? Promise.reject(new Error('Добавьте хотя бы один артикул'))
                  : Promise.resolve(),
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...rest}
                    name={[name, 'articleId']}
                    label="Артикул"
                    rules={[{ required: true, message: 'Выберите артикул' }]}
                  >
                    <Select
                      showSearch
                      loading={componentsLoading}
                      placeholder="Выберите артикул"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={articles.map((article) => ({
                        value: article.id,
                        label: article.articleName,
                      }))}
                      style={{ width: 250 }}
                    ></Select>
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
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить артикул
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item label="Комментарий" name="comment">
          <Input type="text" placeholder="Комментарий к собранным артикулам" />
        </Form.Item>
      </Form>
    </Card>
  );
};
