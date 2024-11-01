import { useCallback, useState } from "react";
import { useUsersStore } from "../store/usersStore";
import { loginByUser, registerByUser } from "../api/http.client";

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
      const { data } = res;
      setCurrentSession(data);
      setMessage(res.detail);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { register, message, currentSession, login };
};

export default useUsers;
