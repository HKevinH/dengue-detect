/* eslint-disable react/prop-types */
import { Avatar, Typography, Row, Col } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Message = ({ text, sender }) => {
  const isUser = sender === "user";
  return (
    <Row justify={isUser ? "end" : "start"} style={{ marginBottom: "10px" }}>
      {!isUser && (
        <Col flex="none" style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{ backgroundColor: "#8e8e8e", marginRight: "8px" }}
            icon={<RobotOutlined />}
          />
        </Col>
      )}
      <Col>
        <div
          style={{
            backgroundColor: isUser ? "#d9d9d9" : "#f0f0f0",
            color: "#000",
            borderRadius: "15px",
            padding: "10px",
            maxWidth: "300px",
            wordWrap: "break-word",
          }}
        >
          <Text>{text}</Text>
        </div>
      </Col>
      {isUser && (
        <Col flex="none" style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{ backgroundColor: "#595959", marginLeft: "8px" }}
            icon={<UserOutlined />}
          />
        </Col>
      )}
    </Row>
  );
};

export default Message;
