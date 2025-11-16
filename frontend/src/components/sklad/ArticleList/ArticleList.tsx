import React, { useState } from 'react';
import { List, Typography, Layout, Tag, Button, Drawer } from 'antd';
import { FilterInput } from '../../FilterInput';
import styles from './ArticleList.module.css';
import { ArticleForm } from '../ArticleForm';

const { Text } = Typography;

type Props = {
  articles: TArticle[];
  selectedId: string | undefined;
  onSelect: (article: TArticle) => void;
};

export const ArticleList: React.FC<Props> = ({ articles, selectedId, onSelect }) => {
  const [filter, setFilter] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const filteredArticles = articles.filter((item) =>
    item.articleName.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div
      style={{
        background: '#fafafa',
        padding: '1rem',
        borderRight: '1px solid #f0f0f0',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        width: '200px',
        gap: '5px',
      }}
    >
      <Text strong style={{ fontSize: 16, marginBottom: 8, display: 'block' }}>
        Артикулы
      </Text>

      <Button
        type="primary"
        onClick={() => {
          setDrawerVisible(true);
        }}
        style={{
          padding: '5px',
        }}
      >
        Создать артикул
      </Button>

      <div style={{ flex: '0 0 auto', marginBottom: 16 }}>
        <FilterInput value={filter} onChange={setFilter} />
      </div>

      <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
        <List
          dataSource={filteredArticles}
          renderItem={(item) => (
            <div className={`${styles.item} ${item.id === selectedId ? styles.selected : ''}`}>
              <List.Item onClick={() => onSelect(item)}>
                <Text>{item.articleName}</Text>
              </List.Item>
            </div>
          )}
        />
      </div>

      <Drawer
        title="Создать артикул"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        <ArticleForm/>
      </Drawer>
    </div>
  );
};
