import { Form, Select, Button, Card, message, InputNumber, Space, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetWarehousesQuery } from '../../store/warehouseApi';

type FormData = {
    name: string,
    stocks?: {
        id: string,
        count: number
    }[]
};

export const CreateComponentForm = () => {
  const [form] = Form.useForm();
  const { data: warehouses = [], isLoading: warehousesLoading } = useGetWarehousesQuery();

  const handleSubmit = async (values: FormData) => {
    // try {
    //   await createTask({
    //     assigneeId: values.assigneeId,
    //     items: values.tasks,
    //   }).unwrap();
    //   message.success('Задача успешно создана!');
    //   form.resetFields();
    // } catch {
    //   message.error('Ошибка при создании задачи');
    // }
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
        <Form.Item name="name">
          <Input type="text" placeholder="Введите название комплектующей" />
        </Form.Item>

        <Form.List name="stocks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...rest}
                    name={[name, 'warehouseId']}
                    label="Склад"
                    rules={[{ required: true, message: 'Выберите склад' }]}
                  >
                    <Select
                      showSearch
                      loading={warehousesLoading}
                      placeholder="Выберите склад"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={warehouses.map((warehouse) => ({
                        value: warehouse.id,
                        label: warehouse.name,
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
                  Добавить комплектующую на склад
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            //   loading={isLoading}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
