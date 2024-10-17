/* eslint-disable react/prop-types */
import { Tabs, Row, Col, Layout, Typography } from "antd";
import { FormLogin, FormRegister } from "./Forms";

const { TabPane } = Tabs;
const { Content } = Layout;
const { Title } = Typography;

const SignUpPage = ({ login }) => {
  const onFinish = (values) => {
    console.log("Received values: ", values);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <div
              style={{
                padding: "30px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title
                level={2}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                Dengue Detect
              </Title>
              <Tabs defaultActiveKey={`${login ? "1" : "2"}`} centered>
                <TabPane tab="Iniciar Sesion" key="1">
                  <FormLogin onFinish={onFinish} />
                </TabPane>
                <TabPane tab="Registrarse" key="2">
                  <FormRegister onFinish={onFinish} />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignUpPage;
