import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import { useGetComponentsQuery } from '../../store/componentsApi';
import { useGetWarehousesQuery } from '../../store/warehouseApi';

export const MovementGoodsForm = () => {
  const [form] = Form.useForm();
  const { data: components = [], isLoading: componentsLoading } = useGetComponentsQuery();
  const { data: warehouses = [], isLoading: warehousesLoading } = useGetWarehousesQuery();

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
          <DatePicker placeholder="Выбрать дату" />
        </Form.Item>

        <Form.Item
          name="typeProduct"
          label="Тип продукта"
          rules={[{ required: true, message: 'Выберите тип' }]}
        >
          <Select
            placeholder="Выбрать тип"
            options={[
              { value: 'ARTICLE', label: 'Артикул' },
              { value: 'COMPONENT', label: 'Комплектующая' },
            ]}
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item
          name="warehouseId"
          label="Склад начальный"
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

        <Form.Item
          name="warehouseId"
          label="Склад конечный"
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

        <Form.Item label="Комментарий" name="comment">
          <Input type="text" placeholder="Комментарий о перемещении" />
        </Form.Item>

      </Form>
    </Card>
  );
};
