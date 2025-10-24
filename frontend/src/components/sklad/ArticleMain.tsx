import React from 'react';
import { Layout } from 'antd';
import { useGetArticlesQuery } from '../../store/articlesApi';
import { ArticleList } from './ArticleList/ArticleList';
import { ArticleCard } from './ArticleCard';
import { useParams, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export const ArticleMain: React.FC = () => {
  const { articleId } = useParams<{ articleId?: string }>();
  const navigate = useNavigate();
  const { data: articles = [], isError, isLoading } = useGetArticlesQuery();

  const defaulArticle = articles[0]

  const selectedArticle = articles.find((a) => a.id === articleId) || null;

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <Layout style={{ height: '100vh', }}>
      <Sider
        width={200}
        style={{
          background: '#fafafa',
          padding: '1rem',
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ArticleList
          articles={articles}
          selectedId={selectedArticle ? selectedArticle?.id : defaulArticle.id}
          onSelect={(article) => navigate(`/warehouse/${article.id}`)}
        />
      </Sider>

      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: '1rem', margin: '1rem' }}>
           <ArticleCard article={selectedArticle ? selectedArticle : defaulArticle} />
        </Content>
      </Layout>
    </Layout>
  );
};
