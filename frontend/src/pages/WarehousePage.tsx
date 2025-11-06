import React from 'react';
import styled from 'styled-components';
import { ComponentsTable } from '../components/Sklad/ComponentsTable';
import { ArticleMain } from '../components/Sklad/ArticleMain';

const Wrapper = styled.div`
  display: flex;
  height: 90vh;
  overflow: hidden;
  & > * {
    min-width: 0;
  }
`;

export const WarehousePage: React.FC = () => {
  return (
    <Wrapper>
        <ArticleMain />
      <div style={{ flex: 2, minWidth: 0, position: "relative", zIndex: 0 }}>
        <ComponentsTable />
      </div>
    </Wrapper>
  );
};
