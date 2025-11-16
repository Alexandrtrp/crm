import { Spin } from 'antd';

export const Loader = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Spin size="large" tip="Загрузка..." />
    </div>
  );
};
