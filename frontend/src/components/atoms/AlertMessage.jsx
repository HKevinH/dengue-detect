/* eslint-disable react/prop-types */
import { notification } from "antd";
import { useEffect } from "react";

const AlertMessage = ({ message, type }) => {
  useEffect(() => {
    if (message) {
      notification[type]({
        message: type === "success" ? "Success" : "Error",
        description: message,
        placement: "top",
        duration: 3,
      });
    }
  }, [message, type]);

  return null;
};

export default AlertMessage;
