import { useEffect, useState, useMemo } from "react";
import { Table, Typography, Spin, Alert } from "antd";
import { useGetComponentsQuery } from "../../store/componentsApi";

const { Title } = Typography;

export const ComponentsTable = () => {
  const [components, setComponents] = useState<TComponents[]>([]);
  const [warehouses, setWarehouses] = useState<string[]>([]);

  const { data, isError, isLoading } = useGetComponentsQuery();

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

  const columns = useMemo(() => {
    const stockColumns = warehouses.map((wh) => ({
      title: wh,
      dataIndex: wh,
      key: wh,
      align: "center" as const,
    }));

    return [
      {
        title: "Комплектующее",
        dataIndex: "name",
        key: "name",
        align: "left" as const,
      },
      ...stockColumns,
      {
        title: "Всего",
        dataIndex: "total",
        key: "total",
        align: "center" as const,
        render: (value: number) => <b>{value}</b>,
      },
    ];
  }, [warehouses]);

  const tableData = useMemo(() => {
    return components.map((component) => {
      const stockMap: Record<string, number> = {};
      component.componentsInStock.forEach((el) => {
        stockMap[el.warehouse.name] = el.count;
      });

      const total = warehouses.reduce(
        (sum, wh) => sum + (stockMap[wh] || 0),
        0
      );

      return {
        key: component.id,
        name: component.name,
        ...stockMap,
        total,
      };
    });
  }, [components, warehouses]);

  
  if (isLoading) return <Spin tip="Загрузка..." />;
  if (isError) return <Alert type="error" message="Ошибка загрузки данных" />;

  return (
    <div style={{ padding: 24, overflow: "auto", height: "90vh" }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Складской учёт комплектующих
      </Title>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: "75vh" }}
        bordered
      />
    </div>
  );
};
