// src/store/uiStore.ts -- a NEW file
// Dark mode lived in Layout; the search term lived in CoursesPage.
// Neither belonged there -- both are settings about the whole app.
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UIState {
  isDarkMode: boolean;
  searchTerm: string;
  toggleDarkMode: () => void;
  setSearchTerm: (term: string) => void;
}

const useUIStore = create<UIState>()(
  persist(
    (set: (partial: Partial<UIState> | ((state: UIState) => Partial<UIState>)) => void) => ({
      isDarkMode: false,
      searchTerm: "",
      // set() takes a FUNCTION when the new value depends on the old one
      toggleDarkMode: () =>
        set((state: UIState) => ({ isDarkMode: !state.isDarkMode })),
      setSearchTerm: (term: string) => set({ searchTerm: term }),
    }),
    {
      // Only the theme is worth remembering — a search box full of old text
      // after a reload would confuse people.
      name: "itelect4-ui",
      partialize: (state: UIState) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

export default useUIStore;
