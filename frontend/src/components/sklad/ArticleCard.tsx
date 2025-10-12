import React, { useCallback } from 'react';
import { Button, Card, Form, Input, Select, Typography, message } from 'antd';
import { useAddStockMutation } from '../../store/articlesApi';

const { Text } = Typography;
const { Option } = Select;

type ArticleCardProps = {
  article: Article;
};

type FormData = {
  warehouseId: number;
  amount: number;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [form] = Form.useForm<FormData>();
  const [addStock, { isLoading }] = useAddStockMutation();

  const warehouses = article.stocks.map((el) => ({
    name: el.warehouse,
    id: el.warehouseId,
  }));

  const onFinish = useCallback(
    async (values: FormData) => {
      try {
        await addStock({
          articleId: article.id,
          warehouseId: values.warehouseId,
          amount: Number(values.amount),
        }).unwrap();

        message.success('Количество успешно добавлено');
        form.resetFields();
      } catch {
        message.error('Ошибка при сохранении');
      }
    },
    [addStock, article.id, form],
  );

  return (
    <Card>
      <h2>{article.articleName}</h2>

      {article.stocks.map((stock) => (
        <p key={stock.warehouseId}>
          На складе {stock.warehouse}: {stock.count}
        </p>
      ))}

      <Text strong>Добавить:</Text>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: '1rem' }}
      >
        <Form.Item
          name="warehouseId"
          label="Склад"
          rules={[{ required: true, message: 'Выберите склад' }]}
        >
          <Select placeholder="Выберите склад">
            {warehouses.map((wh) => (
              <Option key={wh.id} value={wh.id}>
                {wh.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Количество"
          rules={[
            { required: true, type: 'number', min: 1, transform: Number, message: 'Введите положительное число' },
          ]}
        >
          <Input type="number" placeholder="Введите количество" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Сохранить
        </Button>
      </Form>
    </Card>
  );
};
