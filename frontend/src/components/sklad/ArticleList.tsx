// 📁 components/ArticleList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { TitleH2 } from "../../ui/TitleH2";
import { Label } from "../../ui/Label";
import { FilterInput } from "../FilterInput";

const Sidebar = styled.div`
  background-color: #f3f4f6;
  padding: 1rem;
  border-right: 1px solid #e5e7eb;
  overflow: auto;
  height: 90vh;
`;

const Item = styled.div<{ selected: boolean }>`
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: ${({ selected }) => (selected ? "#e0e7ff" : "transparent")};
  cursor: pointer;
  margin-bottom: 0.25rem;
  &:hover {
    background-color: #dbeafe;
  }
`;

type Props = {
  articles: Article[];
  selectedId: string | undefined;
  onSelect: (article: Article) => void;
};

export const ArticleList: React.FC<Props> = ({
  articles,
  selectedId,
  onSelect,
}) => {
  const [filter, setFilter] = useState<string| ''>("");

  const filteredArticles = articles.filter((item) =>
    item.articleName.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <Sidebar>
      <TitleH2>Артикулы</TitleH2>
      <Label>Фильтр</Label>
      <FilterInput
        value={filter}
        onChange={setFilter}
        placeholder="Найти артикул..."
      />
      {filteredArticles.map((item) => (
        <Item
          key={item.id}
          selected={item.id === selectedId}
          onClick={() => onSelect(item)}
        >
          {item.articleName}
        </Item>
      ))}
    </Sidebar>
  );
};
