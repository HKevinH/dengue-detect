/* eslint-disable react/prop-types */
import { Alert } from "antd";

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
