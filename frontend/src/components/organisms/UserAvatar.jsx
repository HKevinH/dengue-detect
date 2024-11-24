import { Avatar, Menu, Dropdown, Button, message, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import useUsers from "../../hooks/useUsers";
import "../../styles/avatar.css";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const UserAvatar = () => {
  const { currentSession } = useUsers();
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      message.success("Sesión cerrada correctamente");
      navigate("/login");
    } else if (e.key === "settings") {
      message.info("Navegar a configuración");
      navigate("/panel/settings");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        {currentSession?.email || "correo@gmail.com"}
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Configuración
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Desconectarse
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button type="text" style={{ padding: 0 }}>
        <Title level={5} className="nameText">
          {currentSession?.name || "Juan Gomez"}
        </Title>
        <Avatar size="large" crossOrigin="anonymous" icon={<UserOutlined />} />
      </Button>
    </Dropdown>
  );
};

export default UserAvatar;
