import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import "../../styles/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3B8C88",
          borderRadius: "4px",
          fontFamily: "Poppins",
          colorBgContainer: "#f0f2f5",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
