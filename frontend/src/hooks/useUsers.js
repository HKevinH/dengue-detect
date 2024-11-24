import { useCallback, useState } from "react";
import { useUsersStore } from "../store/usersStore";
import { getUserInfo, loginByUser, registerByUser } from "../api/http.client";
import { setKeyStorage } from "../storage/session";

const useUsers = () => {
  const [message, setMessage] = useState("");
  const { currentSession, setCurrentSession } = useUsersStore((state) => state);

  const register = useCallback(async (user) => {
    const newUser = {
      email: user.email,
      name: user.fullname,
      password: user.password,
    };
    try {
      const res = await registerByUser(newUser);
      const { data } = res;
      setCurrentSession(data);
      setMessage(res.detail);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const login = useCallback(async (user) => {
    const newUser = {
      email: user.email,
      password: user.password,
    };
    try {
      const res = await loginByUser(newUser);
      const { access_token } = res;

      if (access_token) {
        const user = await getUserInfo(newUser);

        console.log(user);
        setKeyStorage("token", access_token);

        setCurrentSession(user);
      }

      setMessage(res.detail);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const clearMessage = useCallback(() => {
    setMessage("");
  }, []);

  const logout = useCallback(() => {
    setCurrentSession(null);
    setKeyStorage("token", "");
  }, []);

  return { register, message, currentSession, login, clearMessage, logout };
};

export default useUsers;
