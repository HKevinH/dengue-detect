/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  HeatMapOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Tooltip } from "antd";
import "../../styles/sidebar.css";
import { useNavigate } from "react-router";
import Joyride from "react-joyride"; // Importamos react-joyride

const { Sider } = Layout;

const menus = [
  {
    key: "1",
    icon: <HomeOutlined />,
    text: "Noticias",
    description:
      "Aquí puedes ver noticias sobre el dengue y otros datos importantes.",
    navigate: "/panel/dashboard",
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    text: "Cuestionario",
    description: "Accede al cuestionario para obtener datos sobre el dengue.",
    navigate: "/panel/questionnaire",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    text: "Resultados",
    description: "Revisa los resultados de los cuestionarios enviados.",
    navigate: "/panel/results",
  },
  {
    key: "4",
    icon: <HeatMapOutlined />,
    text: "Mapa",
    description: "Explora el mapa de zonas afectadas por el dengue.",
    navigate: "/panel/zones",
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    text: "Configuraciones",
    description: "Ajusta las configuraciones de tu cuenta y la plataforma.",
    navigate: "/panel/settings",
  },
  {
    key: "6",
    icon: <LogoutOutlined />,
    text: "Chat",
    description: "Accede al chatbot para asistencia interactiva.",
    navigate: "/panel/chat",
  },
];

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const [runTour, setRunTour] = useState(true);

  const handleMenuClick = (menu) => {
    if (menu.navigate) {
      navigate(menu.navigate);
    }
  };

  return (
    <>
      <Joyride
        steps={menus.map((menu) => ({
          target: `.menu-item-${menu.key}`,
          content: (
            <div>
              <strong>{menu.text}</strong>
              <p>{menu.description}</p>
            </div>
          ),
          disableBeacon: true,
          placement: "right",
        }))}
        run={runTour}
        disableScrolling={false}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
            fontFamily: "Poppins",
          },
          options: {
            zIndex: 10000,
          },
          buttonNext: {
            backgroundColor: "#001529",
            textAlign: "center",
            fontFamily: "Poppins",
            borderRadius: "5px",
          },
        }}
        locale={{
          next: "Siguiente",
          back: "Atrás",
          skip: "Saltar",
          last: "Finalizar",
        }}
      />

      {/* Sidebar */}
      <Sider
        className="sidebar"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        breakpoint="lg"
        collapsedWidth="100"
        width={250}
      >
        <div
          className="logo-sidebar"
          style={{ padding: "20px", color: "#fff" }}
        >
          {collapsed ? "DD" : "DengueDetect"}
        </div>

        <Menu
          theme="dark"
          className="sidebar-menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "#1F2937",
            color: "#ffffff",
          }}
        >
          {menus.map((menu) => (
            <Menu.Item
              key={menu.key}
              className={`menu-item-${menu.key}`}
              icon={
                <Tooltip title={collapsed ? menu.text : ""} placement="right">
                  {menu.icon}
                </Tooltip>
              }
              onClick={() => handleMenuClick(menu)}
            >
              {!collapsed && menu.text}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};
