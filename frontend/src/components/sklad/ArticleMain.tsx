import { useState } from 'react';
import { mockStats } from '../../mock/data';
import { useGetArticlesQuery } from '../../store/articlesApi';
import { ArticleList } from './ArticleList';
import { ArticleCard } from './ArticleCard';
import { WeeklyStats } from './WeeklyStats';
import { useParams, useNavigate } from 'react-router-dom';

export const ArtilceMain = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const navigate = useNavigate();
  const { data: articles = [], isError, isLoading } = useGetArticlesQuery();
  const selectedArticle = articles.find((article) => article.id === articleId) || null;

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <>
      <ArticleList
        articles={articles}
        selectedId={selectedArticle?.id}
        onSelect={(article) => navigate(`/warehouse/${article.id}`)}
      />
      {selectedArticle ? (
        <ArticleCard article={selectedArticle} />
      ) : (
        <WeeklyStats stats={mockStats} />
      )}
    </>
  );
};
