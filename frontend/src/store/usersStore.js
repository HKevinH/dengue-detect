import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  currentSession: null,
  setUsers: (users) => set({ users }),
  setCurrentSession: (currentSession) => set({ currentSession }),
  logout: () => set({ currentSession: null }),
}));
