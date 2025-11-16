import { useEffect, useState, useMemo } from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import { useGetComponentsQuery } from '../../store/componentsApi';
import { useGetWarehousesQuery } from '../../store/warehouseApi';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Loader } from '../ui/Loader';

const { Title } = Typography;

export const ComponentsTable = () => {
  const { data: components, isError, isLoading } = useGetComponentsQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();

  const columns = useMemo(() => {
    const stockColumns = warehouses.map((wh) => ({
      title: wh.name,
      dataIndex: wh.id,
      key: wh.id,
      align: 'center' as const,
    }));

    return [
      {
        title: 'Комплектующие',
        dataIndex: 'name',
        key: 'name',
        align: 'left' as const,
      },
      ...stockColumns,
      {
        title: 'Всего',
        dataIndex: 'total',
        key: 'total',
        align: 'center' as const,
        render: (value: number) => <b>{value}</b>,
      },
    ];
  }, [warehouses]);

  const tableData = useMemo(() => {
    return components?.map((component) => {
      const stockMap: Record<string, number> = {};
      component.componentsInStock.forEach((el) => {
        stockMap[el.warehouse.id] = el.count;
      });

      const total = warehouses.reduce((sum, wh) => sum + (stockMap[wh.id] || 0), 0);

      return {
        key: component.id,
        name: component.name,
        ...stockMap,
        total,
      };
    });
  }, [components, warehouses]);

  if (isLoading)
    return <Loader/>

  if (isError)
    return <ErrorMessage/>
    
  return (
    <div style={{ padding: 24, height: '90vh' }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Складской учёт комплектующих
      </Title>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: '75vh' }}
        bordered
      />
    </div>
  );
};
