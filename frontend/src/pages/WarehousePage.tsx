import React from 'react';
import { ComponentsTable } from '../components/Component/ComponentsTable';
import { ArticleMain } from '../components/Article/ArticleMain';
import { Splitter, Tabs } from 'antd';
import { ArticleTable } from '../components/Article/ArticleTable';

export const WarehousePage: React.FC = () => {
  const tabItems = [
    {
      label: 'Артикулы',
      key: 'articles',
      children: (
        <Splitter style={{ height: '80vh' }}>
          <Splitter.Panel defaultSize="50%" min="40%" max="60%" style={{ overflow: 'hidden' }}>
            <ArticleMain />
          </Splitter.Panel>

          <Splitter.Panel>
            <ArticleTable />
          </Splitter.Panel>
        </Splitter>
      ),
    },
    { label: 'Комплектующие', key: 'components', children: <ComponentsTable /> },
  ];

  return (
      <Tabs
        defaultActiveKey="production"
        tabPosition="top"
        size="middle"
        style={{paddingLeft: '1rem', margin: 0 }}
        items={tabItems.map((tab) => ({ label: tab.label, key: tab.key, children: tab.children }))}
      />
  );
};
