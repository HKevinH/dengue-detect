import { Avatar, Layout } from "antd";

import PanelText from "../atoms/PanelText";
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
        paddingTop: "4px",
        minHeight: window.innerHeight * 0.97,
        overflowY: "hidden",
      }}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout
        style={{
          marginLeft: collapsed ? "100px" : "250px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header className="header-nav">
          <UserAvatar />
        </Header>

        <Content
          style={{
            padding: "10px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPanelTemplate;
