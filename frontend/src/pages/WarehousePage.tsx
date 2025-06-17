// 📁 WarehousePage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArticleList } from "../components/sklad/ArticleList";
import { ArticleCard } from "../components/sklad/ArticleCard";
import { WeeklyStats } from "../components/sklad/WeeklyStats";
import { mockStats } from "../mock/data";
import { ComponentsTable } from "../components/sklad/ComponentsTable";
import { useAddStockMutation, useGetArticlesQuery } from "../store/articlesApi";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 2fr;
  height: 100vh;
`;

export const WarehousePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { data: articles = [], error, isLoading } = useGetArticlesQuery(); 
  const [addStock] = useAddStockMutation();

  const handleSubmitAmount = async (
    articleId: number,
    amount: number,
    warehouseId: number
  ) => {
    try {
      await addStock({ articleId, amount, warehouseId }).unwrap();
      alert("Успешно добавлено!");
    } catch (e) {
      console.error(e);
      alert("Ошибка при добавлении");
    }
  };

  return (
    <Wrapper>
      <ArticleList
        articles={articles}
        selectedId={selectedArticle?.id}
        onSelect={(article) => setSelectedArticle(article)}
      />
      {selectedArticle ? (
        <ArticleCard article={selectedArticle} onSubmit={handleSubmitAmount} />
      ) : (
        <WeeklyStats stats={mockStats} />
      )}
      <ComponentsTable />
    </Wrapper>
  );
};
