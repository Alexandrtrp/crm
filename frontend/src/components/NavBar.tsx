import React from "react";
import { Layout, Menu, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: "/", label: "Главная" },
    { key: "/warehouse", label: "Складской учёт" },
    { key: "/tasks", label: "Задачи" },
    { key: "/profile", label: "Профиль" },
  ];

  const activeItem = menuItems.find((item) =>
    item.key === "/" ? location.pathname === "/" : location.pathname.startsWith(item.key)
  );
  const activeKey = activeItem?.key;

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1890ff",
        padding: "0 2rem",
      }}
    >
      <Text style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}>
        CRM
      </Text>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeKey || ""]}
        onClick={(e) => navigate(e.key)}
        items={menuItems.map((item) => ({
          key: item.key,
          label: item.label,
        }))}
        style={{ backgroundColor: "#1890ff", borderBottom: "none" }}
      />
    </Header>
  );
};
