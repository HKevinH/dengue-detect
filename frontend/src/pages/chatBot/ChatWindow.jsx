import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Typography,
  Input as AntInput,
  Button as AntButton,
} from "antd";
import MessageList from "../../components/molecules/MessageList";
import { sendChatMessage } from "../../api/http.client";
import "../../styles/chat.css";

const { Content } = Layout;
const { Title } = Typography;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMessage = { content: inputValue, role: "user" };

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user" },
      ]);
      setInputValue("");
      setLoading(true);

      try {
        const response = await sendChatMessage([
          ...messages.map((msg) => ({
            content: msg.text,
            role: msg.sender === "user" ? "user" : "assistant",
          })),
          userMessage,
        ]);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.text, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error al procesar el mensaje con Chatbase:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Ocurrió un error. Intenta nuevamente.", sender: "bot" },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Content className="chat-container">
      <Title level={3} className="chat-title">
        Chatbot
      </Title>

      <div className="message-container">
        {messages.length > 0 ? (
          <>
            <MessageList messages={messages} />
            <div ref={messageEndRef} />
          </>
        ) : (
          <div className="empty-chat">
            <Title level={4} className="typewriter">
              ¡Hola! ¿En qué puedo ayudarte hoy?
            </Title>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <AntInput
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={loading}
        />
        <AntButton type="primary" onClick={handleSend} loading={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </AntButton>
      </div>
    </Content>
  );
};

export default ChatWindow;
