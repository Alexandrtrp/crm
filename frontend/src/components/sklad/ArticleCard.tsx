// 📁 components/ArticleCard.tsx
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Input } from "../ui/Input";
import { Text } from "../ui/Text";
import { SaveButton } from "../ui/Button";
import { Select } from "../ui/Select";
import { useAddStockMutation } from "../../store/articlesApi";
import { Snackbar } from "../ui/Snackbar";
import { useForm } from "rc-field-form";
import Form from "rc-field-form/es/Form";

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

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [amount, setAmount] = useState(0);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | "">();
  const warehouses = article.stocks.map((el) => ({
    name: el.warehouse,
    id: el.warehouseId,
  }));

  const [form] = useForm();

  const [addStock, { isLoading, isError }] = useAddStockMutation();

  const onSubmit = useCallback(() => {}, []);

  return (
      <Form form={form} onFinish={}>
        <Card>
          <h2>{article.articleName}</h2>
          {article.stocks.map((stock) => (
            <p key={stock.warehouseId}>
              На складе {stock.warehouse} : {stock.count}
            </p>
          ))}

          <Text>Добавить:</Text>

          <Select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(+e.target.value)}
          >
            <option value="">Выберите склад</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </Select>

          <Input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setAmount(+value);
              }
            }}
          />
          {/* </label> */}
          <SaveButton
            disabled={Boolean(!selectedWarehouse) || isLoading}
            onClick={() => {
              if (!selectedWarehouse) {
                return;
              }
              onSubmit(article.id, amount, selectedWarehouse);
              setAmount(0);
              setSelectedWarehouse("");
            }}
          >
            {isLoading ? "Сохраняем..." : "Сохранить"}
          </SaveButton>
        </Card>
      </Form>
  );
};
