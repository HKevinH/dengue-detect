import axios from "axios";
import { getKeyStorage } from "../storage/session";
import { message } from "antd";

const token = getKeyStorage("token");

const http = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (url) => {
  try {
    const response = await http.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const post = async (url, data) => {
  try {
    const response = await http.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const put = async (url, data) => {
  try {
    const response = await http.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const remove = async (url) => {
  try {
    const response = await http.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const chatPost = async (message) => {
  try {
    const response = await axios.post('https://www.chatbase.co/api/v1/chat',{
      messages: message,
      chatbotId: "5Nwj_533NJjNSXTPbp6Sw",
      stream: false,
      temperature: 0.1,
      conversationId: 'denguedeapi'
    }, {
      headers: {
        "Content-Type": 'application/json',
        'Authorization': 'Bearer 1d1de8c2-48a1-4397-9046-df43456893d2'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response?.data || { message: "Error al realizar la solicitud" };
  }
};

