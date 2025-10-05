import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetComponentsQuery } from "../../store/componentsApi";
import { Table, TableRow, Td, Th, Thead } from "../../ui/TableStyled";

// Стили
const Container = styled.div`
  padding: 24px;
  margin: 10px;
  overflow: auto;
  height: 90vh;
  box-sizing: border-box;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const TotalTd = styled(Td)`
  font-weight: 600;
`;

export const ComponentsTable = () => {
  const [components, setComponents] = useState<TComponents[]>([]);
  const [warehouses, setWarehouses] = useState<string[]>([]);

  const { data, isError, isLoading } = useGetComponentsQuery();

  useEffect(() => {
    if (isError) console.error("API isError:", isError);
  }, [isError]);

  useEffect(() => {
    if (data) {
      setComponents(data);

      const uniqueWarehouses: string[] = Array.from(
        new Set(
          data.flatMap((component) =>
            component.componentsInStock.map((el) => el.warehouse.name)
          )
        )
      );
      setWarehouses(uniqueWarehouses);
    }
  }, [data]);

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <Container>
      <Title>Складской учёт комплектующих</Title>
      <Table>
        <Thead>
          <tr>
            <Th>Комплектующее</Th>
            {warehouses.map((wh) => (
              <Th key={wh}>{wh}</Th>
            ))}
            <Th>Всего</Th>
          </tr>
        </Thead>
        <tbody>
          {components.map((component) => {
            const stockMap: Record<string, number> = {};
            component.componentsInStock.forEach((el) => {
              stockMap[el.warehouse.name] = el.count;
            });

            const total = warehouses.reduce(
              (sum, wh) => sum + (stockMap[wh] || 0),
              0
            );

            return (
              <TableRow key={component.id}>
                <Td style={{ textAlign: "left" }}>{component.name}</Td>
                {warehouses.map((wh) => (
                  <Td>{stockMap[wh] || 0}</Td>
                ))}
                <TotalTd>{total}</TotalTd>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
