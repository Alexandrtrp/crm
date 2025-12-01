import { Tabs } from 'antd';
import { MovementGoodsForm } from '../components/InputForms/MovementGoodsForm';
import { InputPurchaseForm } from '../components/InputForms/InputPurchaseForm';
import { InputProductionForm } from '../components/InputForms/InputProductionForm';

export const InputPage = () => {

  const tabItems = [
    { label: 'Производство', key: 'production', children: <InputProductionForm /> },
    { label: 'Закупки', key: 'purchase', children: <InputPurchaseForm /> },
    { label: 'Перемещение', key: 'movement', children: <MovementGoodsForm /> },
  ];

  return (
    <Tabs
      defaultActiveKey="production"
      tabPosition="left"
      size="middle"
      style={{ height: '90vh' }}
      items={tabItems.map((tab) => ({ label: tab.label, key: tab.key, children: tab.children }))}
    />
  );
};
