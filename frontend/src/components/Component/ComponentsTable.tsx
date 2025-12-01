import { useMemo, useState } from 'react';
import { Button, Drawer, Input, Table, type TableColumnsType } from 'antd';
import { useGetComponentsQuery } from '../../store/componentsApi';
import { useGetWarehousesQuery } from '../../store/warehouseApi';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Loader } from '../ui/Loader';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { CreateComponentForm } from './CreateComponentForm';
import { EditComponentForm } from './EditComponentForm';

interface ComponentRow {
  key: string;
  name: string;
  total: number;
  [warehouseId: string]: string | number;
}

export const ComponentsTable = () => {
  const [drawerVisible, setDrawerVisible] = useState<'create' | 'edit' | ''>('');
  const { data: components, isError, isLoading } = useGetComponentsQuery();
  const { data: warehouses = [] } = useGetWarehousesQuery();

  const columns: TableColumnsType<ComponentRow> = useMemo(() => {
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
        filterDropdown: (props: FilterDropdownProps) => {
          const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;

          return (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
              <Input
                placeholder="Поиск артикула"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => confirm()}
                style={{ marginBottom: 8, display: 'block' }}
              />

              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90, marginRight: 8 }}
              >
                Поиск
              </Button>

              <Button
                onClick={() => {
                  clearFilters?.();
                  confirm();
                }}
                size="small"
                style={{ width: 90 }}
              >
                Сброс
              </Button>
            </div>
          );
        },

        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),

        onFilter: (value, record) =>
          record.name.toLowerCase().includes(String(value).toLowerCase()),
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

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button
          type="primary"
          onClick={() => {
            setDrawerVisible('create');
          }}
          style={{ width: '150px' }}
        >
          Создать
        </Button>

        <Button
          type="primary"
          onClick={() => {
            setDrawerVisible('edit');
          }}
          style={{ width: '150px' }}
        >
          Редактировать
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ y: '75vh' }}
        bordered
      />

      <Drawer
        title={drawerVisible === 'create' ? 'Создать комплектующую' : 'Редактировать комплектующую'}
        placement="right"
        onClose={() => setDrawerVisible('')}
        open={drawerVisible === 'create' || drawerVisible === 'edit'}
        width={600}
      >
        {drawerVisible === 'create' && <CreateComponentForm />}
        {drawerVisible === 'edit' && <EditComponentForm />}
      </Drawer>
    </div>
  );
};
