import { useState, useCallback } from "react";
import { sendChatMessage } from "../api/http.client";

const useChatbase = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async ({ messages, chatbotId }) => {
    setLoading(true);
    setError(null);
    try {
        console.log('realiza el llamaod a cb')
      const res = await sendChatMessage(messages, chatbotId);
      setResponse(res);
    } catch (err) {
      console.error("Error al enviar mensaje a Chatbase:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return { sendMessage, response, loading, error, clearResponse };
};

export default useChatbase;
