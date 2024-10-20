import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import PanelTitle from "../atoms/PanelTitle";
import PanelText from "../atoms/PanelText";
import PrimaryButton from "../atoms/Button";
import "../../styles/profile-card.css";

const ProfileCard = () => (
  <Card bordered={false} className="profile-card">
    <UserOutlined style={{ fontSize: "24px", color: "#00000" }} />
    <PanelTitle>Perfil</PanelTitle>
    <PanelText>Nombre: María García</PanelText>
    <br />
    <PanelText>Ubicación: Madrid, España</PanelText>
    <br />
    <PrimaryButton style={{ marginTop: "10px" }}>Editar Perfil</PrimaryButton>
  </Card>
);

export default ProfileCard;
