import { create } from "zustand";

type SheetsState = {
  searchSheet: boolean;
  setSearchSheet: (sheet: boolean) => void;
  createClientSheet: boolean;
  setCreateClientSheet: (sheet: boolean) => void;
  addMachineSheet: boolean;
  setAddMachineSheet: (sheet: boolean) => void;
  addEquipmentSheet: boolean;
  setAddEquipmentSheet: (sheet: boolean) => void;
  sessionMachineSheet: boolean;
  setSessionMachineSheet: (sheet: boolean) => void;
};

export const useSheets = create<SheetsState>((set) => ({
  searchSheet: false,
  setSearchSheet: (sheet) => set({ searchSheet: sheet }),
  createClientSheet: false,
  setCreateClientSheet: (sheet) => set({ createClientSheet: sheet }),
  addMachineSheet: false,
  setAddMachineSheet: (sheet) => set({ addMachineSheet: sheet }),
  addEquipmentSheet: false,
  setAddEquipmentSheet: (sheet) => set({ addEquipmentSheet: sheet }),
  sessionMachineSheet: false,
  setSessionMachineSheet: (sheet) => set({ sessionMachineSheet: sheet }),
}));
