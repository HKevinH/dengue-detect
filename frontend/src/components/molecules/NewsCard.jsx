import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

const NewsCard = ({ title, description, date, image }) => (
  <Card
    hoverable
    cover={<img alt={title} src={image} />}
    style={{
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#001529",
      color: "white",
    }}
    bodyStyle={{ padding: "16px" }}
  >
    <Title level={4} style={{ color: "#ffffff" }}>
      {title}
    </Title>
    <Text style={{ color: "#bfbfbf", display: "block", marginBottom: "8px" }}>
      {date}
    </Text>
    <Text style={{ color: "#d9d9d9" }}>{description}</Text>
    <Button
      type="link"
      style={{ color: "#40a9ff", padding: 0, marginTop: "10px" }}
    >
      Leer más
    </Button>
  </Card>
);

export default NewsCard;
