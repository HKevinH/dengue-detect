/* eslint-disable react/prop-types */
import {
  HeatMapOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Tooltip } from "antd";
import "../../styles/sidebar.css";
import { useNavigate } from "react-router";
import { useState } from "react";

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
    icon: <HeatMapOutlined />,
    text: "Mapa",
    navigate: "/panel/zones",
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    text: "Settings",
  },
  {
    key: "6",
    icon: <LogoutOutlined />,
    text: "Bot",
    navigate: "/panel/chat",
  },
];

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider
      className="sidebar"
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      breakpoint="lg"
      collapsedWidth="100"
      width={250}
    >
      <div className="logo-sidebar" style={{ padding: "20px", color: "#fff" }}>
        {collapsed ? "DD" : "DengueDetect"}
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
            icon={
              <Tooltip title={collapsed ? menu.text : ""} placement="right">
                {menu.icon}
              </Tooltip>
            }
            onClick={() => {
              if (menu.navigate) {
                navigate(menu.navigate);
              } else if (menu.onClick) {
                menu.onClick();
              }
            }}
          >
            {!collapsed && menu.text}
          </Menu.Item>
        ))}
      </Menu>

      <div className="sidebar-footer">{!collapsed && "Account"}</div>
    </Sider>
  );
};
