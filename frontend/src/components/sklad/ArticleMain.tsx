import { useState } from "react";
import { mockStats } from "../../mock/data";
import {
  useGetArticlesQuery,
} from "../../store/articlesApi";
import { ArticleList } from "./ArticleList";
import { ArticleCard } from "./ArticleCard";
import { WeeklyStats } from "./WeeklyStats";

export const ArtilceMain = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { data: articles = [], isError, isLoading } = useGetArticlesQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;
  
  return (
    <>
      <ArticleList
        articles={articles}
        selectedId={selectedArticle?.id}
        onSelect={(article) => setSelectedArticle(article)}
      />
      {selectedArticle ? (
        <ArticleCard article={selectedArticle} />
      ) : (
        <WeeklyStats stats={mockStats} />
      )}
    </>
  );
};
