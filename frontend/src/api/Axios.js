import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export const get = async (url) => {
  try {
    const response = await http.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await http.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const put = async (url, data) => {
  try {
    const response = await http.put(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
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
