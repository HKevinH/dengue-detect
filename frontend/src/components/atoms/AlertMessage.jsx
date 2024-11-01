import { Alert } from "antd";
import React from "react";

const AlertMessage = ({ message, type }) => {
  return (
    <Alert
      message={message}
      type={type}
      showIcon
      closable
      style={{ marginBottom: "10px" }}
    />
  );
};

export { AlertMessage };
