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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getNewsNotices = async () => {
  try {
    const response = await get("news");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const getHistoryResultsByUser = async (id) => {
  try {
    const response = await get(`history/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { registerByUser, loginByUser, getNewsNotices, getHistoryResultsByUser };
