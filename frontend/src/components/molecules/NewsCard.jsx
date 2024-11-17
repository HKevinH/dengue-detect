import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

const NewsCard = ({ title, description, date, image, url }) => (
  <Card
    hoverable
    cover={<img alt={title} src={image} />}
    style={{
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#001529",
      color: "white",
      height: "600px",
    }}
    
    bodyStyle={{ padding: "16px", display: "flex", flexDirection: "column" }}
  >
    <Title level={4} style={{ color: "#ffffff", flexGrow: 1 }}>
      {title}
    </Title>
    <Text style={{ color: "#bfbfbf", display: "block", marginBottom: "8px" }}>
      {date}
    </Text>
    <Text style={{ color: "#d9d9d9", flexGrow: 1 }}>{description}</Text>
    <Button
      type="link"
      style={{ color: "#40a9ff", padding: 0, marginTop: "10px" }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">Leer más</a>
    </Button>
  </Card>
);

export default NewsCard;