/* eslint-disable react/prop-types */
import React from "react";
import { Card, Typography, Button, Skeleton } from "antd";

const { Title, Text } = Typography;

const NewsCard = ({ title, description, date, image, url, loading }) => (
  <Card
    hoverable
    cover={
      loading ? (
        <Skeleton.Image
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ) : (
        <img
          alt={title}
          src={image}
          style={{
            objectFit: "cover",
            height: "150px",
            width: "100%",
          }}
        />
      )
    }
    style={{
      borderRadius: "8px",
      overflow: "hidden",
      alignItems: "stretch",
      backgroundColor: "#001529",
      color: "white",
      height: "400px",
    }}
    bodyStyle={{ padding: "16px", display: "flex", flexDirection: "column" }}
  >
    {loading ? (
      <Skeleton active title={{ width: "80%" }} paragraph={false} />
    ) : (
      <Title level={4} style={{ color: "#ffffff", flexGrow: 1 }}>
        {title}
      </Title>
    )}

    {loading ? (
      <Skeleton active title={false} paragraph={{ rows: 1, width: "60%" }} />
    ) : (
      <Text style={{ color: "#bfbfbf", display: "block", marginBottom: "8px" }}>
        {new Date(date).toLocaleDateString("es-CO", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
    )}

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
      {loading ? (
        <Skeleton active title={false} paragraph={{ rows: 2 }} />
      ) : (
        <Text style={{ color: "#d9d9d9", flexGrow: 1 }}>{description}</Text>
      )}
    </div>

    {loading ? (
      <Skeleton.Button active size="small" style={{ width: "60px" }} />
    ) : (
      <Button
        type="link"
        style={{
          color: "#40a9ff",
          padding: 0,
          marginTop: "10px",
          paddingBottom: "20px",
        }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          Leer más
        </a>
      </Button>
    )}
  </Card>
);

export default NewsCard;
