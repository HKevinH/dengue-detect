import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Typography,
  Input as AntInput,
  Button as AntButton,
} from "antd";
import MessageList from "../../components/molecules/MessageList";
import "../../styles/chat.css";
const { Content } = Layout;
const { Title } = Typography;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      setTimeout(() => {
        let botResponse = "Respuesta del chatbot";

        if (inputValue.toLowerCase().includes("dengue")) {
          botResponse =
            "Recomendaciones para el dengue:\n1. Bebe mucha agua.\n2. Descansa.\n3. Consulta a un médico si los síntomas empeoran.";
        } else if (inputValue.toLowerCase().includes("muy mal")) {
          botResponse =
            "Siento que te sientas así. Aquí tienes algunas recomendaciones:\n1. Mantén la calma.\n2. Si los síntomas son graves, busca ayuda médica inmediata.\n3. Intenta descansar y mantente hidratado.";
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: botResponse,
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Layout
      className="layout-container-chat"
      style={{
        padding: "20px",
        height: window.innerHeight * 0.85,
        width: window.innerWidth * 0.85,
      }}
    >
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
          />
          <AntButton type="primary" onClick={handleSend}>
            Enviar
          </AntButton>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatWindow;
