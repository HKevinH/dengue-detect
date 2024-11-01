import axios from "axios";
import { getKeyStorage } from "../storage/session";

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
