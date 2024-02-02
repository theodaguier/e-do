import { create } from "zustand";
import { User } from "../types/user.type";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (use: User) => set({ use }),
  setToken: (token: string) => set({ token }),
}));
