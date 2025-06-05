// 📁 components/ArticleCard.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 2rem;
`;

const Img = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 1rem;
`;

const Field = styled.input`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 100px;
`;

const Button = styled.button`
  margin-top: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
`;

type Props = {
  article: Article;
  onSubmit: (id: number, amount: number) => void;
};

export const ArticleCard: React.FC<Props> = ({ article, onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);

  return (
    <Card>
      <h2>{article.name}</h2>
      <Img src={article.image} alt={article.name} />
      <p>Состав: {article.composition}</p>
      <p>Цена за упаковку: {article.price} ₽</p>
      <p>На складе: {article.count}</p>
      <label>
        Добавить:
        <Field
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <Button onClick={() => onSubmit(article.id, amount)}>Сохранить</Button>
    </Card>
  );
};

