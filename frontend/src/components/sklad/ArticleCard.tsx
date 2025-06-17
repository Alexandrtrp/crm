// 📁 components/ArticleCard.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../ui/Input";
import { Text } from "../ui/Text";
import { SaveButton } from "../ui/Button";
import { Select } from "../ui/Select";

const Card = styled.div`
  padding: 2rem;
`;

const Img = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 1rem;
`;

type Props = {
  article: Article;
  onSubmit: (id: number, amount: number, warehouseId: number) => void;
};

export const ArticleCard: React.FC<Props> = ({ article, onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | "">("");
  const warehouses = article.stocks.map((el) => ({
    name: el.warehouse,
    id: el.warehouseId,
  }));

  return (
    <Card>
      <h2>{article.articleName}</h2>
      {article.stocks.map((stock) => (
        <p key={stock.warehouseId}>
          На складе {stock.warehouse} : {stock.count}
        </p>
      ))}
      {/* <label>  */}
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
        onClick={() => {
          if (!selectedWarehouse) {
            alert("Выберите склад");
            return;
          }
          onSubmit(article.id, amount, selectedWarehouse);
          setAmount(0);
          setSelectedWarehouse("");
        }}
      >
        Сохранить
      </SaveButton>
    </Card>
  );
};
