import React from 'react';
import { ComponentsTable } from '../components/Sklad/ComponentsTable';
import { ArticleMain } from '../components/Sklad/ArticleMain';
import { Splitter } from 'antd';


export const WarehousePage: React.FC = () => {
  return (
    <Splitter style={{ height: '90vh' }}>
      <Splitter.Panel defaultSize="45%" min="35%" max="60%" style={{overflow: 'hidden'}}>
        <ArticleMain />
      </Splitter.Panel>

      <Splitter.Panel>
        <ComponentsTable />
      </Splitter.Panel>
    </Splitter>
  );
};
