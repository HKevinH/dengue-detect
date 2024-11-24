/* eslint-disable react/prop-types */
import React from "react";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

const NewsCard = ({ title, description, date, image, url }) => (
  <Card
    hoverable
    cover={
      <img
        alt={title}
        src={image}
        style={{
          objectFit: "cover",
          height: "150px",
          width: "100%",
        }}
      />
    }
    style={{
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#001529",
      color: "white",
      height: "450px",
    }}
    bodyStyle={{ padding: "16px", display: "flex", flexDirection: "column" }}
  >
    <Title level={4} style={{ color: "#ffffff", flexGrow: 1 }}>
      {title}
    </Title>
    <Text style={{ color: "#bfbfbf", display: "block", marginBottom: "8px" }}>
      {date}
    </Text>
    <div
      style={{
        color: "#d9d9d9",
        flexGrow: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        marginBottom: "10px",
      }}
    >
      <Text style={{ color: "#d9d9d9", flexGrow: 1 }}>{description}</Text>
    </div>
    <Button
      type="link"
      style={{ color: "#40a9ff", padding: 0, marginTop: "10px" }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        Leer más
      </a>
    </Button>
  </Card>
);

export default NewsCard;
