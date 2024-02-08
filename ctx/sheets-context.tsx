import { create } from "zustand";

type SheetsState = {
  searchSheet: boolean;
  setSearchSheet: (sheet: boolean) => void;
  createClientSheet: boolean;
  setCreateClientSheet: (sheet: boolean) => void;
};

export const useSheets = create<SheetsState>((set) => ({
  searchSheet: false,
  setSearchSheet: (sheet) => set({ searchSheet: sheet }),
  createClientSheet: false,
  setCreateClientSheet: (sheet) => set({ createClientSheet: sheet }),
}));
