import { get, post, chatPost } from "./axios";

const registerByUser = async (user) => {
  try {
    const response = await post("register", user);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const loginByUser = async (user) => {
  try {
    const response = await post("login", user);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getNewsNotices = async () => {
  try {
    const response = await get("news");
    return response;
  } catch (error) {
    console.error(error);
  }
};
const getHistoryResultsByUser = async (id) => {
  try {
    const response = await get(`history/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const sendModelQuestion = async (values) => {
  try {
    const response = await post("classification", values);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getUserInfo = async (data) => await post(`me`, data);

const sendChatMessage = async (messages) => {

  try {
    const response = await chatPost(messages);
    return response;
  } catch (error) {
    console.error("Error al enviar mensaje a Chatbase:", error.message);
    throw error;
  }
};

export {
  registerByUser,
  loginByUser,
  sendModelQuestion,
  getNewsNotices,
  getHistoryResultsByUser,
  getUserInfo,
  sendChatMessage,
};
