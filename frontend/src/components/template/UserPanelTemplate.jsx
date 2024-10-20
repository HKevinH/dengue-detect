import { Layout, Button } from "antd";

import PanelText from "../atoms/PanelText";
import { Sidebar } from "../organisms/Sidebar";
import { Outlet } from "react-router";

const { Header, Content } = Layout;

const UserPanelTemplate = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout style={{ marginLeft: "200px" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button type="link" style={{ color: "#0B8043" }}>
            &larr; Volver
          </Button>
          <PanelText strong>Hola, María García</PanelText>
        </Header>

        <Content
          style={{
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPanelTemplate;
