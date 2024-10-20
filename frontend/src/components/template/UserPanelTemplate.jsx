import { Layout, Row, Col, Button } from "antd";

import ProfileCard from "../organisms/ProfileCard";
import NotificationCard from "../organisms/NotificationCard";
import LastQuestionnaireCard from "../organisms/LastQuestionnaireCard";
import PanelTitle from "../atoms/PanelTitle";
import PanelText from "../atoms/PanelText";
import { Sidebar } from "../organisms/Sidebar";

const { Header, Content } = Layout;

const UserPanelTemplate = () => (
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
        <PanelTitle
          level={2}
          style={{ color: "#0B8043", marginBottom: "20px" }}
        >
          Tu Panel
        </PanelTitle>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <ProfileCard />
          </Col>
          <Col xs={24} sm={12}>
            <NotificationCard />
          </Col>
          <Col xs={24}>
            <LastQuestionnaireCard />
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
);

export default UserPanelTemplate;
