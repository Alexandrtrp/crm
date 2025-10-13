import React from 'react';
import styled from 'styled-components';
import { ComponentsTable } from '../components/Sklad/ComponentsTable';
import { ArticleMain } from '../components/Sklad/ArticleMain';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  & > * {
    min-width: 0;
  }
`;

export const WarehousePage: React.FC = () => {
  return (
    <Wrapper>
      <div style={{ flex: 1.25, minWidth: 0 }}>
        <ArticleMain />
      </div>
      <div style={{ flex: 2, minWidth: 0, position: "relative", zIndex: 0 }}>
        <ComponentsTable />
      </div>
    </Wrapper>
  );
};
