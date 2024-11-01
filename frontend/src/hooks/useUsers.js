import { useCallback, useState } from "react";
import { useUsersStore } from "../store/usersStore";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { currentSession } = useUsersStore((state) => state);

  const register = useCallback(async (user) => {
    console.log(user);
  }, []);
  return { users, register };
};

export default useUsers;
