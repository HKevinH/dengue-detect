import { get, post } from "./axios";

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

export {
  registerByUser,
  loginByUser,
  sendModelQuestion,
  getNewsNotices,
  getHistoryResultsByUser,
  getUserInfo,
};
