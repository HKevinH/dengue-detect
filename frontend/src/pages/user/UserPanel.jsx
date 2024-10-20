import React from "react";
import { Layout, Card, Typography, Row, Col, Button, Menu } from "antd";
import {
  BellOutlined,
  EnvironmentOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UserPanelTemplate from "../../components/template/UserPanelTemplate";

const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;

const UserPanel = () => {
  return <UserPanelTemplate />;
};

export default UserPanel;
