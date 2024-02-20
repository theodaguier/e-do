import { create } from "zustand";

type EquipmentFilterState = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const useEquipmentFilter = create<EquipmentFilterState>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
