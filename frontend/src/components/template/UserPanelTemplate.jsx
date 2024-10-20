import { Layout, Row, Col, Button, Menu } from "antd";
import {
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ProfileCard from "../organisms/ProfileCard";
import NotificationCard from "../organisms/NotificationCard";
import LastQuestionnaireCard from "../organisms/LastQuestionnaireCard";
import PanelTitle from "../atoms/PanelTitle";
import PanelText from "../atoms/PanelText";

const { Header, Sider, Content } = Layout;

const UserPanelTemplate = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider
      style={{
        backgroundColor: "#0B8043",
      }}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Mi Panel
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "#0B8043",
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Inicio
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Perfil
        </Menu.Item>
        <Menu.Item key="3" icon={<BellOutlined />}>
          Notificaciones
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Configuración
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    </Sider>

    {/* Contenido principal */}
    <Layout>
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
