import { Avatar, Menu, Dropdown, Button, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const UserAvatar = () => {
  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      message.success("Sesión cerrada correctamente");
    } else if (e.key === "settings") {
      message.info("Navegar a configuración");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
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
        <Avatar size="large" icon={<UserOutlined />} />
      </Button>
    </Dropdown>
  );
};

export default UserAvatar;
