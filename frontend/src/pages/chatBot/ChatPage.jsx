import { Layout } from "antd";
import ChatWindow from "./ChatWindow";
const ChatPage = () => {
  return (
    <Layout
      className="layout-container-chat"
      style={{
        padding: "20px",
        height: window.innerHeight * 0.95,
        width: window.innerWidth * 0.85,
      }}
    >
      <ChatWindow />;
    </Layout>
  );
};

export default ChatPage;
