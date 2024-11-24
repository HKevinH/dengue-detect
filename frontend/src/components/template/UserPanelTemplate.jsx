import { Layout } from "antd";

import { Sidebar } from "../organisms/Sidebar";
import { Outlet } from "react-router";
import { useState } from "react";
import UserAvatar from "../organisms/UserAvatar";
import "../../styles/userPanelTemplate.css";

const { Header, Content } = Layout;

const UserPanelTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        paddingTop: "2px",
        minHeight: window.innerHeight * 0.98,
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout
        style={{
          flexGrow: 1,
          marginLeft: collapsed ? "100px" : "250px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header className="header-nav">
          <UserAvatar />
        </Header>

        <Content className="content-container">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPanelTemplate;
