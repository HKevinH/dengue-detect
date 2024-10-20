import {
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "../../styles/sidebar.css";
import { useNavigate } from "react-router";

const { Sider } = Layout;

const menus = [
  {
    key: "1",
    icon: <HomeOutlined />,
    text: "Dashboard",
    onClick: () => console.log("Dashboard"),
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    text: "Search",
    onClick: () => console.log("Search"),
  },
  {
    key: "3",
    icon: <UserOutlined />,
    text: "Docs",
    onClick: () => console.log("Docs"),
  },
  {
    key: "4",
    icon: <BellOutlined />,
    text: "Products",
    onClick: () => console.log("Products"),
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    text: "Settings",
    onClick: () => console.log("Settings"),
  },
  {
    key: "6",
    icon: <LogoutOutlined />,
    text: "Bot",
    navigate: "/chat",
    onClick: () => console.log("Bot"),
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Sider className="sidebar" breakpoint="lg" collapsedWidth="80">
      <div
        className="logo-sidebar"
        style={{
          color: "#fff",
          textAlign: "center",
          padding: "30px 0",
          fontSize: "20px",
          fontWeight: "bold",
          backgroundColor: "#111827",
        }}
      >
        DengueDetect
      </div>

      <Menu
        theme="dark"
        className="sidebar-menu"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "#1F2937",
          color: "#ffffff",
        }}
      >
        {menus.map((menu) => (
          <Menu.Item
            key={menu.key}
            className="sidebar-menu-item"
            icon={menu.icon}
            onClick={() => {
              if (menu.navigate) {
                navigate(menu.navigate);
              } else {
                menu.onClick();
              }
            }}
            style={{
              color: "#ffffff",
              borderRadius: "8px",
              margin: "5px 10px",
              padding: "12px",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            {menu.text}
          </Menu.Item>
        ))}
      </Menu>

      <div className="sidebar-footer">Account</div>
    </Sider>
  );
};
