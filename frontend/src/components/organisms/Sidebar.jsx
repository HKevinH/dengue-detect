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
    navigate: "/panel/chat",
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Sider className="sidebar" breakpoint="lg" collapsedWidth="80">
      <div className="logo-sidebar">DengueDetect</div>

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
          >
            {menu.text}
          </Menu.Item>
        ))}
      </Menu>

      <div className="sidebar-footer">Account</div>
    </Sider>
  );
};
