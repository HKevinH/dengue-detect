/* eslint-disable react/prop-types */
import { Card, Row, Col } from "antd";

const Message = ({ text, sender }) => {
  return (
    <Row
      justify={sender === "user" ? "end" : "start"}
      style={{ marginBottom: "5px" }}
    >
      <Col>
        <Card
          bordered={false}
          style={{
            backgroundColor: sender === "user" ? "#daf8cb" : "#f1f0f0",
            color: "#000",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "300px",
            display: "inline-block",
            wordWrap: "break-word",
          }}
          bodyStyle={{ padding: "10px" }}
        >
          <p style={{ fontSize: 12, fontWeight: 800 }}>
            {sender === "user" ? `Tu` : "Bot"}
          </p>
          <p style={{ marginBottom: 0 }}>{text}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default Message;
