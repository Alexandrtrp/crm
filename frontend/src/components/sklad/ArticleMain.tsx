import React from 'react';
import { Layout } from 'antd';
import { mockStats } from '../../mock/data';
import { useGetArticlesQuery } from '../../store/articlesApi';
import { ArticleList } from './ArticleList/ArticleList';
import { ArticleCard } from './ArticleCard';
import { WeeklyStats } from './WeeklyStats';
import { useParams, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export const ArticleMain: React.FC = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const navigate = useNavigate();
  const { data: articles = [], isError, isLoading } = useGetArticlesQuery();

  const selectedArticle = articles.find((a) => a.id === articleId) || null;

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        width={300}
        style={{
          background: '#fafafa',
          padding: '1rem',
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          zIndex: 1,
        }}
      >
        <ArticleList
          articles={articles}
          selectedId={selectedArticle?.id}
          onSelect={(article) => navigate(`/warehouse/${article.id}`)}
        />
      </Sider>

      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: '1rem' }}>
          {selectedArticle && <ArticleCard article={selectedArticle} />}
        </Content>
      </Layout>
    </Layout>
  );
};
