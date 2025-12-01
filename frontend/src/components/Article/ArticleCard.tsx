import React, { useCallback, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Drawer,
  Form,
  Input,
  List,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import { useAddStockMutation } from '../../store/articlesApi';
import Title from 'antd/es/typography/Title';
import { ArticleForm } from './ArticleForm';

const { Text } = Typography;
const { Option } = Select;

type ArticleCardProps = {
  article: TArticle;
  warehouses: TWarehouse[];
};

type FormData = {
  warehouseId: number;
  amount: number;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, warehouses }) => {
  const [form] = Form.useForm<FormData>();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [addStock, { isLoading }] = useAddStockMutation();

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
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={4}>{article.articleName}</Title>
        <Button
          type="primary"
          onClick={() => {
            setDrawerVisible(true);
          }}
        >
          Редактировать
        </Button>
      </div>

      {article.components?.length > 0 && (
        <Card
          title="Состав артикула"
          style={{
            borderRadius: 12,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            marginBottom: '1rem',
          }}
          styles={{
            body: { padding: '1rem' },
          }}
        >
          <List
            dataSource={article.components}
            renderItem={(component) => (
              <List.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <Text style={{ flex: 1, minWidth: 0, wordBreak: 'break-word' }}>
                    {component.componentName}
                  </Text>
                  <Text type="secondary" style={{ marginLeft: '0.5rem' }}>
                    × {component.quantityPerArticle}
                  </Text>
                </div>
              </List.Item>
            )}
          />
        </Card>
      )}

      {article.stocks?.length > 0 && (
        <Card
          title="Остатки на складах"
          style={{
            borderRadius: 12,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            marginBottom: '1rem',
          }}
          styles={{
            body: { padding: '1rem' },
          }}
        >
          <List
            dataSource={article.stocks}
            renderItem={(stock) => (
              <List.Item>
                <Space>
                  <Text strong>{stock.warehouse}</Text>
                  <Divider type="vertical" />
                  <Text>{stock.count} шт.</Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      )}

      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}
        styles={{
          body: { padding: '1rem' },
        }}
      >
        <Text strong style={{ display: 'block', marginBottom: '0.5rem' }}>
          Добавить:
        </Text>

        <Form form={form} onFinish={onFinish} layout="vertical">
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
              {
                required: true,
                type: 'number',
                min: 1,
                transform: Number,
                message: 'Введите положительное число',
              },
            ]}
          >
            <Input type="number" placeholder="Введите количество" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
            Сохранить
          </Button>
        </Form>
      </Card>
      <Drawer
        title="Редактировать артикул"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        <ArticleForm name={article.articleName} baseComponents={article.components} stocks={article.stocks}/>
      </Drawer>
    </Card>
  );
};
