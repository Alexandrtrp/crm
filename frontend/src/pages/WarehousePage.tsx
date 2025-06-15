// 📁 WarehousePage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArticleList } from "../components/sklad/ArticleList";
import { ArticleCard } from "../components/sklad/ArticleCard";
import { WeeklyStats } from "../components/sklad/WeeklyStats";
import { mockArticles, mockStats } from "../mock/data";
import { ComponentsTable } from "../components/sklad/ComponentsTable";
import { useGetArticlesQuery } from "../store/articlesApi";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 2fr;
  height: 100vh;
`;

export const WarehousePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([])

  const handleSubmitAmount = (id: number, amount: number) => {
    console.log(`Сохранено ${amount} для артикула ${id}`);
    // setSelectedArticle(null); // сброс выбора после ввода
  };

  const { data, error, isLoading } = useGetArticlesQuery();
  useEffect(() => {
    if(data) setArticles(data)
  }, [data]);

  console.log(data);
  if (data) {
  console.log(data[0].id); // ← должен выводить ID
}

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
