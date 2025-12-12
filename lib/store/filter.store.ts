import { create } from "zustand";

interface FilterState {
  search: string;
  category: string;
  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
}

export const useFiltersStore = create<FilterState>((set) => ({
  search: "",
  category: "all",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
}));
