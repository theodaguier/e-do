import { create } from "zustand";
import { User } from "../types/user.type";
import { checkAuth } from "../utils/auth.utils";

export const useAuthStore = create((set) => ({
  user: null,
  token: checkAuth(),
  setUser: (use: User) => set({ use }),
  setToken: (token: string) => set({ token }),
}));
