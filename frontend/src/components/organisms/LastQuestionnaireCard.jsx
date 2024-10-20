import { Card } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import PanelTitle from "../atoms/PanelTitle";
import PanelText from "../atoms/PanelText";
import PrimaryButton from "../atoms/Button";

const LastQuestionnaireCard = () => (
  <Card
    bordered={false}
    style={{
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    }}
  >
    <EnvironmentOutlined style={{ fontSize: "24px", color: "#0B8043" }} />
    <PanelTitle>Último Cuestionario</PanelTitle>
    <PanelText>Puntuación: 85/100</PanelText>
    <br />
    <PanelText>
      Nivel de riesgo: <span style={{ color: "red" }}>Bajo</span>
    </PanelText>
    <br />
    <PrimaryButton style={{ marginTop: "10px" }}>Ver Detalles</PrimaryButton>
  </Card>
);

export default LastQuestionnaireCard;
