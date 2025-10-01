// 📁 WarehousePage.tsx
import React from "react";
import styled from "styled-components";
import { ComponentsTable } from "../components/Sklad/ComponentsTable";
import { ArtilceMain } from "../components/Sklad/ArticleMain";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 2fr;
  height: 100vh;
`;

export const WarehousePage: React.FC = () => {

  return (
    <Wrapper>
      <ArtilceMain/>
      <ComponentsTable />
    </Wrapper>
  );
};
