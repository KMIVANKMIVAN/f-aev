import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  addUser: (newUser) => set((state) => ({ users: [...state.users, newUser] })),
}));
