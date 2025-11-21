import { Card, Avatar, Space, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const { Text } = Typography;

export const UserCard:React.FC<TUser> = ({ user }) => {
  return (
    <Card
      style={{ width: 260 }}
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
    >
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        {/* <Avatar size={72} src={user.avatar} /> */}
        <Title level={3}>{user.name}</Title>
        {/* <Text>{user.role}</Text> */}
      </Space>
    </Card>
  );
};
