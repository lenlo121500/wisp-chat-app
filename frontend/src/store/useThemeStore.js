// store/useThemeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },

      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
        if (state) {
          // Apply the theme after hydration
          document.documentElement.setAttribute("data-theme", get().theme);
        }
      },
    }),
    {
      name: "chat-app-theme",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);
