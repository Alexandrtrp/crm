import React from "react";
import styled from "styled-components";

import {
  warehouseStatus,
  incomingShipments,
  outgoingShipments,
  myTasks,
  kpi,
  notifications,
} from "../mock/data";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 колонки равной ширины */
  gap: 1.5rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);  /* на средних экранах 2 колонки */
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;  /* на маленьких экранах — 1 колонка */
  }
`;


const Section = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const HomePage: React.FC = () => {
  return (
    <Grid>
      <Section>
        <Title>Статус склада</Title>
        <ul>
          {warehouseStatus.map(({ article, quantity, note }) => (
            <li key={article}>
              {article} — {quantity} шт.{note ? ` (${note})` : ""}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Title>Ожидаемые поставки</Title>
        <ul>
          {incomingShipments.map(({ id, supplier, date }) => (
            <li key={id}>
              Поставка №{id} от {supplier} — {date}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Title>Отгрузки</Title>
        <ul>
          {outgoingShipments.map(({ id, date }) => (
            <li key={id}>
              Отгрузка №{id} — {date}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Title>Мои задачи</Title>
        <ul>
          {myTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <Title>KPI</Title>
        <ul>
          {kpi.map(({ label, value }) => (
            <li key={label}>
              {label}: {value}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Title>Уведомления</Title>
        <ul>
          {notifications.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </Section>
    </Grid>
  );
};
