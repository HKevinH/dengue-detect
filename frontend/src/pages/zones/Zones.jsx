import { Layout, Row, Col, Typography, Button, Card, Menu } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import MapComponent from "../../components/organisms/MapComponent";
import "../../styles/zones.css";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export const Zones = () => {
  const [showCard, setShowCard] = useState(false);

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <Layout className="container-map-zone">
      <Content style={{ backgroundColor: "#fff" }}>
        <Row style={{ position: "relative" }}>
          <Col span={24}>
            <MapComponent />

            <Button
              type="primary"
              shape="circle"
              icon={<MenuOutlined />}
              size="large"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 1000,
              }}
              onClick={toggleCard}
            />

            {showCard && (
              <Card
                title="Zonas Afectadas"
                className="floating-card"
                extra={
                  <Button type="text" onClick={toggleCard}>
                    Cerrar
                  </Button>
                }
              >
                <Menu
                  mode="vertical"
                  className="floating-menu"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item key="1">Zonas con Alto Riesgo</Menu.Item>
                  <Menu.Item key="2">Zonas con Medio Riesgo</Menu.Item>
                  <Menu.Item key="3">Zonas con Bajo Riesgo</Menu.Item>
                </Menu>
              </Card>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Zones;
