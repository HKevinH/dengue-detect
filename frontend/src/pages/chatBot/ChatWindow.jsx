import { useState } from 'react';
import { Row, Col, Layout, Typography, Input as AntInput, Button as AntButton } from 'antd';
import MessageList from '../../components/molecules/MessageList';

const { Content } = Layout;
const { Title } = Typography;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      //lógica para enviar el mensaje al backend/chatbot
    }
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <div
              style={{
                padding: '20px',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
                Chatbot
              </Title>

              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  marginBottom: '20px',
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '10px',
                }}
              >
                <MessageList messages={messages} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AntInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  style={{ flex: 1, marginRight: '10px' }}
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