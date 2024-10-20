import { Card } from "antd";
import { BellOutlined } from "@ant-design/icons";
import PanelTitle from "../atoms/PanelTitle";
import PanelText from "../atoms/PanelText";

const NotificationCard = () => (
  <Card
    bordered={false}
    style={{
      height: "100%",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    }}
  >
    <BellOutlined style={{ fontSize: "24px", color: "#0B8043" }} />
    <PanelTitle>Notificaciones</PanelTitle>
    <div>
      <BellOutlined style={{ color: "#F4A261", marginRight: "10px" }} />
      <PanelText>Cambio de situación en tu zona</PanelText>
    </div>
    <div>
      <BellOutlined style={{ color: "#F4A261", marginRight: "10px" }} />
      <PanelText>Nuevo cuestionario disponible</PanelText>
    </div>
  </Card>
);

export default NotificationCard;
