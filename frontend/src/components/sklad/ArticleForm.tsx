import { Form, Select, Button, Card, message, InputNumber, Space, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetComponentsQuery } from '../../store/componentsApi';
import { useGetWarehousesQuery } from '../../store/warehouseApi';
import { useEffect } from 'react';

type FormData = {
  tasks: { articleId: string; quantity: number }[];
  assigneeId: string;
};

type ArticleForm = {
  name?: string;
  baseComponents?: {
    componentId: string;
    componentName: string;
    quantityPerArticle: number;
  }[];

  stocks?: {
    warehouseId: number;
    warehouse: number;
    count: number;
  }[];
};

export const ArticleForm: React.FC<ArticleForm> = ({ name, baseComponents, stocks }) => {
  const [form] = Form.useForm();
  const { data: components = [], isLoading: componentsLoading } = useGetComponentsQuery();
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

  useEffect(() => {
    if (baseComponents && baseComponents.length > 0) {
      form.setFieldsValue({
        components: baseComponents.map((c) => ({
          componentId: c.componentId,
          quantity: c.quantityPerArticle,
        })),
      });
    }

    if (stocks && stocks.length > 0) {
      form.setFieldsValue({
        stocks: stocks.map((warehouse) => ({
          warehouseId: warehouse.warehouseId,
          quantity: warehouse.count,
        })),
      });
    }

    if (name) {
      form.setFieldValue('articleName', name);
    }
  }, [baseComponents, form]);

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
        <Form.Item name="articleName">
          <Input type='text' placeholder='Введите название артикула'/>
        </Form.Item>

        <Form.List
          name="components"
          rules={[
            {
              validator: async (_, components) =>
                !components || components.length < 1
                  ? Promise.reject(new Error('Добавьте хотя бы одну комплетующую'))
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
                    name={[name, 'componentId']}
                    label="Комплетующая"
                    rules={[{ required: true, message: 'Выберите комплетующую' }]}
                  >
                    <Select
                      showSearch
                      loading={componentsLoading}
                      placeholder="Выберите комплетующую"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={components.map((component) => ({
                        value: component.id,
                        label: component.name,
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
                  Добавить комплетующую
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="stocks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...rest}
                    name={[name, 'warehouseId']}
                    label="Склад"
                    rules={[{ required: true, message: 'Выберите комплетующую' }]}
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
                  Добавить артикул на склад
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
