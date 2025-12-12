// store/filters.ts
import { create } from "zustand";


export interface FilterState {
globalFilter: string;
pageIndex: number;
pageSize: number;
setGlobalFilter: (v: string) => void;
setPageIndex: (i: number) => void;
setPageSize: (s: number) => void;
}


export const useFilterStore = create<FilterState>((set: any) => ({
  globalFilter: "",
  pageIndex: 0,
  pageSize: 10,
  setGlobalFilter: (globalFilter: string) => set({ globalFilter, pageIndex: 0 }),
  setPageIndex: (pageIndex: number) => set({ pageIndex }),
  setPageSize: (pageSize: number) => set({ pageSize }),
}));