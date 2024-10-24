import { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Layout,
  Typography,
  Input as AntInput,
  Button as AntButton,
} from "antd";
import MessageList from "../../components/molecules/MessageList";

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
    <Layout>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <div
              style={{
                padding: "20px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Title
                level={2}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                Chatbot
              </Title>

              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  marginBottom: "20px",
                  padding: "10px",
                  scrollbarColor: "#f5f5f5 #fff",
                  borderRadius: "10px",
                  scrollbarWidth: "thin",
                }}
              >
                <MessageList messages={messages} />
                <div ref={messageEndRef} />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <AntInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  style={{ flex: 1, marginRight: "10px" }}
                />
                <AntButton type="primary" onClick={handleSend}>
                  Enviar
                </AntButton>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ChatWindow;
