import { useMemo } from 'react';
import { Button, Input, Table } from 'antd';
import { useGetWarehousesQuery } from '../../store/warehouseApi';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Loader } from '../ui/Loader';
import { useGetArticlesQuery } from '../../store/articlesApi';
import type { TableColumnsType, TableColumnType, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';

 interface ArticleRow {
  key: string; 
  name: string;
  total: number;
  [warehouseId: string]: string | number; 
}


export const ArticleTable = () => {
  const { data: articles, isError, isLoading } = useGetArticlesQuery();
  const { data: warehouses } = useGetWarehousesQuery();

  const articleWarehouses =
    warehouses?.filter((warehouse) => warehouse.location === 'Russia') || [];

  const columns: TableColumnsType<ArticleRow> = useMemo(() => {
    const stockColumns = articleWarehouses.map((wh) => ({
      title: wh.name,
      dataIndex: wh.id,
      key: wh.id,
      align: 'center' as const,
    }));

    return [
      {
        title: 'Артикулы',
        dataIndex: 'name',
        key: 'name',
        align: 'left',

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
  }, [articleWarehouses]);

  const tableData = useMemo(() => {
    return articles?.map((article) => {
      const stockMap: Record<string, number> = {};
      article.stocks.forEach((el) => {
        stockMap[el.warehouseId] = el.count;
      });

      const total = articleWarehouses.reduce((sum, wh) => sum + (stockMap[wh.id] || 0), 0);

      return {
        key: article.id,
        name: article.articleName,
        ...stockMap,
        total,
      };
    });
  }, [articles, articleWarehouses]);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage />;

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      scroll={{ y: '75vh' }}
      bordered
    />
  );
};
