import { Card, Avatar, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export const UserCard = ({ user }) => {
  return (
    <Card
      style={{ width: 260 }}
      actions={[
        <EditOutlined key="edit" />,
        <DeleteOutlined key="delete" />,
      ]}
    >
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Avatar size={72} src={user.avatar} />
        <Title level={3}>{user.fullName}</Title>
        <Text>{user.role}</Text>
      </Space>
    </Card>
  );
};
