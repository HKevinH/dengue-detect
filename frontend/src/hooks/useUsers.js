import { useState } from "react";
import { useUsersStore } from "../store/usersStore";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { currentSession } = useUsersStore((state) => state);

  return { users };
};

export default useUsers;
