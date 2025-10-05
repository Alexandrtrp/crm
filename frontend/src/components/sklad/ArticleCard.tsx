import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Input } from '../../ui/Input';
import { Text } from '../../ui/Text';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { useAddStockMutation } from '../../store/articlesApi';
import { Snackbar } from '../../ui/Snackbar';
import Form, { Field, useForm, useWatch } from 'rc-field-form';
import { FieldError } from '../../ui/FieldError';

const Card = styled.div`
  padding: 2rem;
`;

const Img = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 1rem;
`;

type ArticleCardProps = {
  article: Article;
};

type FormData = {
  warehouseId: number;
  amount: number;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const warehouses = article.stocks.map((el) => ({
    name: el.warehouse,
    id: el.warehouseId,
  }));

  const [form] = useForm<FormData>();
  const [addStock, { isLoading, isError }] = useAddStockMutation();

  const values = useWatch([], form);

  const onFinish = useCallback(
    async (values: FormData) => {
      await addStock({
        articleId: article.id,
        warehouseId: values.warehouseId,
        amount: Number(values.amount),
      }).unwrap();

      form.resetFields();
    },
    [form, article.id, addStock],
  );

  const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);

  const isTouched = form.isFieldsTouched(true);

  const isDisabled =
    isLoading || !isTouched || hasErrors || !values?.warehouseId || !values?.amount;

  return (
    <Card>
      {isError && <Snackbar message="Ошибка при добавлении" />}
      <h2>{article.articleName}</h2>

      {article.stocks.map((stock) => (
        <p key={stock.warehouseId}>
          На складе {stock.warehouse}: {stock.count}
        </p>
      ))}

      <Text>Добавить:</Text>

      <Form form={form} onFinish={onFinish}>
        <Field name="warehouseId" rules={[{ required: true, message: 'Выберите склад' }]}>
          {({ value, onChange }, meta) => (
            <div>
              <Select value={value ?? ''} onChange={(e) => onChange(Number(e.target.value))}>
                <option value="">Выберите склад</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </Select>
              {meta.touched && meta.errors.length > 0 && <FieldError>{meta.errors[0]}</FieldError>}
            </div>
          )}
        </Field>

        <Field
          name="amount"
          rules={[
            { required: true, message: 'Введите количество' },
            {
              validator: (_, value) =>
                value && Number(value) > 0
                  ? Promise.resolve()
                  : Promise.reject('Введите положительное число'),
            },
          ]}
        >
          {({ value, onChange }, meta) => (
            <div>
              <Input
                type="number"
                min="1"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Количество"
              />
              {meta.touched && meta.errors.length > 0 && <FieldError>{meta.errors[0]}</FieldError>}
            </div>
          )}
        </Field>

        <Button type="submit" disabled={isDisabled}>
          {isLoading ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </Form>
    </Card>
  );
};
