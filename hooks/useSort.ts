import { ASCENDING } from "@/lib/constants";
import { create } from "zustand";

interface SortStore {
  field: string;
  setField: (field: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}

const useSort = create<SortStore>((set) => ({
  field: "breed",
  setField: (field: string) => set({ field }),
  sortOrder: ASCENDING,
  setSortOrder: (currSortOrder: string) =>
    set({
      sortOrder: currSortOrder,
    }),
}));

export default useSort;
