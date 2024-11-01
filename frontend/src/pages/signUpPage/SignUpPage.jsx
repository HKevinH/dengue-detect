/* eslint-disable react/prop-types */
import { Tabs, Row, Col, Layout, Typography } from "antd";
import { FormLogin, FormRegister } from "./Forms";
import useUsers from "../../hooks/useUsers";
import AlertMessage from "../../components/atoms/AlertMessage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const { TabPane } = Tabs;
const { Content } = Layout;
const { Title } = Typography;

const SignUpPage = ({ login }) => {
  const navigate = useNavigate();
  const {
    register,
    message,
    currentSession,
    login: loginUser,
    clearMessage,
  } = useUsers();

  const onFinish = async (values) => {
    if (login) {
      await loginUser(values);
    } else {
      await register(values);
    }
  };

  useEffect(() => {
    if (currentSession) {
      navigate("/panel");
    }
  }, [currentSession, navigate]);

  useEffect(() => {
    if (message) {
      clearMessage();
    }
  }, [message, clearMessage]);

  const handleTabChange = (key) => {
    navigate(key === "1" ? "/login" : "/register");
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
              <Tabs
                defaultActiveKey={`${login ? "1" : "2"}`}
                centered
                onChange={handleTabChange}
              >
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

      {message && message.length > 0 && (
        <AlertMessage
          message={message}
          type={
            message.includes("Error") || message.includes("incorrectos")
              ? "error"
              : "success"
          }
        />
      )}
    </Layout>
  );
};

export default SignUpPage;
