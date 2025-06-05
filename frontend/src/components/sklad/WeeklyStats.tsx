// 📁 components/WeeklyStats.tsx
import React from "react";
import styled from "styled-components";

const Block = styled.div`
  padding: 2rem;
`;

type Props = {
  stats: { name: string; done: number }[];
};

export const WeeklyStats: React.FC<Props> = ({ stats }) => {
  return (
    <Block>
      <h2>Сделано за неделю</h2>
      <ul>
        {stats.map((s) => (
          <li key={s.name}>
            {s.name}: <strong>{s.done}</strong> шт.
          </li>
        ))}
      </ul>
    </Block>
  );
};
