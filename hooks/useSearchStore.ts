import { MAX_AGE, MIN_AGE } from "@/lib/constants";
import { create } from "zustand";

interface SearchStore {
  selectedBreeds: string[];
  addBreed: (breed: string) => void;
  removeBreed: (breed: string) => void;
  resetBreeds: () => void;
  selectedZipCodes: string[];
  addZipCode: (zipCode: string) => void;
  removeZipCode: (zipCode: string) => void;
  resetZipCodes: () => void;
  ageMin: number;
  ageMax: number;
  setMinAge: (age: number) => void;
  setMaxAge: (age: number) => void;
  resetSearch: () => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  selectedBreeds: [],
  // add if not already in array
  addBreed: (breed) =>
    set((state) => ({
      selectedBreeds: state.selectedBreeds.includes(breed)
        ? state.selectedBreeds
        : [...state.selectedBreeds, breed],
    })),
  removeBreed: (breed) =>
    set((state) => ({
      selectedBreeds: state.selectedBreeds.filter((b) => b !== breed),
    })),
  resetBreeds: () =>
    set(() => ({
      selectedBreeds: [],
    })),
  selectedZipCodes: [],
  addZipCode: (zipCode) =>
    set((state) => ({
      selectedZipCodes: state.selectedZipCodes.includes(zipCode)
        ? state.selectedZipCodes
        : [...state.selectedZipCodes, zipCode],
    })),
  removeZipCode: (zipCode) =>
    set((state) => ({
      selectedZipCodes: state.selectedZipCodes.filter((z) => z !== zipCode),
    })),
  resetZipCodes: () =>
    set(() => ({
      selectedZipCodes: [],
    })),
  ageMin: MIN_AGE,
  ageMax: MAX_AGE,
  setMinAge: (age) =>
    set(() => ({
      ageMin: age,
    })),
  setMaxAge: (age) =>
    set(() => ({
      ageMax: age,
    })),
  resetSearch: () =>
    set(() => ({
      selectedBreeds: [],
      selectedZipCodes: [],
      ageMin: MIN_AGE,
      ageMax: MAX_AGE,
    })),
  isSearching: false,
  setIsSearching: (isSearching) =>
    set(() => ({
      isSearching,
    })),
}));

export default useSearchStore;
