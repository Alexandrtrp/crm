import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: '/profile/users', label: 'Сотрудники' },
    { key: '/profile/create-user', label: 'Создать профиль' },
    // { key: '/profile/users', label: '' },
  ];

  const activeItem = menuItems.find((item) =>
    item.key === '/' ? location.pathname === '/' : location.pathname.startsWith(item.key),
  );
  const activeKey = activeItem?.key;
  return (
    <Layout style={{ height: '90vh' }}>
      <Sider
        width={200}
        style={{
          background: '#fafafa',
          padding: '1rem',
          borderRight: '1px solid #f0f0f0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[activeKey || '']}
          onClick={(e) => navigate(e.key)}
          items={menuItems.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
        />
      </Sider>
      <Content style={{ padding: '1rem', margin: '1rem' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
