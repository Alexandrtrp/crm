// 📁 WarehousePage.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { ArticleList } from "../components/sklad/ArticleList";
import { ArticleCard } from "../components/sklad/ArticleCard";
import { WeeklyStats } from "../components/sklad/WeeklyStats";
import { mockArticles, mockStats } from "../mock/data";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
`;

export const WarehousePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleSubmitAmount = (id: number, amount: number) => {
    console.log(`Сохранено ${amount} для артикула ${id}`);
    // setSelectedArticle(null); // сброс выбора после ввода
  };

  return (
    <Wrapper>
      <ArticleList
        articles={mockArticles}
        selectedId={selectedArticle?.id}
        onSelect={(article) => setSelectedArticle(article)}
      />
      {selectedArticle ? (
        <ArticleCard article={selectedArticle} onSubmit={handleSubmitAmount} />
      ) : (
        <WeeklyStats stats={mockStats} />
      )}
    </Wrapper>
  );
};
