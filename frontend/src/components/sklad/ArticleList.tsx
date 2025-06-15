// 📁 components/ArticleList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { TitleH2 } from "../ui/TitleH2";
import { Label } from "../ui/Label";
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
  selectedId: number | undefined;
  onSelect: (article: Article) => void;
};

export const ArticleList: React.FC<Props> = ({
  articles,
  selectedId,
  onSelect,
}) => {
  const [filter, setFilter] = useState("");

  // const filteredArticles = articles.filter((a) =>
  //   a.articleName.toLowerCase().includes(filter.toLowerCase())
  // );
  if (!articles) return <div>Загрузка...</div>;
  return (
    <Sidebar>
      <TitleH2>Артикулы</TitleH2>
      <Label>Фильтр</Label>
      <FilterInput
        value={filter}
        onChange={setFilter}
        placeholder="Найти артикул..."
      />
      {articles.map((a) => (
        <Item
          key={a.id}
          selected={a.id === selectedId}
          onClick={() => onSelect(a)}
        >
          {a.articleName}
        </Item>
      ))}
    </Sidebar>
  );
};
