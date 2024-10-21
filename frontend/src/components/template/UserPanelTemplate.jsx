import { Layout } from "antd";

import PanelText from "../atoms/PanelText";
import { Sidebar } from "../organisms/Sidebar";
import { Outlet } from "react-router";

const { Header, Content } = Layout;

const UserPanelTemplate = () => {
  return (
    <Layout
      style={{ minHeight: window.innerHeight * 0.9, overflowY: "hidden" }}
    >
      <Sidebar />

      <Layout style={{ marginLeft: "200px" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <PanelText strong>Hola, María García</PanelText>
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
