import React, { useState } from 'react';
import { List, Typography, Layout, Tag } from 'antd';
import { FilterInput } from '../../FilterInput';
import styles from './ArticleList.module.css';

const { Sider } = Layout;
const { Text } = Typography;

type Props = {
  articles: Article[];
  selectedId: string | undefined;
  onSelect: (article: Article) => void;
};

export const ArticleList: React.FC<Props> = ({ articles, selectedId, onSelect }) => {
  const [filter, setFilter] = useState<string>('');

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
        width: '200px'
      }}
    >
      <Text strong style={{ fontSize: 16, marginBottom: 8, display: 'block' }}>
        Артикулы
      </Text>

      <Tag color="blue" style={{ marginBottom: 8 }}>
        Фильтр
      </Tag>

      <div style={{ flex: '0 0 auto', marginBottom: 16 }}>
        <FilterInput value={filter} onChange={setFilter} />
      </div>

      <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>
        <List
          dataSource={filteredArticles}
          renderItem={(item) => (
            <div className={`${styles.item} ${item.id === selectedId ? styles.selected : ''}`}>
              <List.Item
                onClick={() => onSelect(item)}
              >
                <Text>{item.articleName}</Text>
              </List.Item>
            </div>
          )}
        />
      </div>
    </div>
  );
};
