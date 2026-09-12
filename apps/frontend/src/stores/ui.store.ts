/**
 * @file ui.store.ts
 * @description Zustand state for theme and shell-only UI presentation state.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

type UiState = {
  theme: Theme;
  isSidebarOpen: boolean;
  isMoreOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  openMore: () => void;
  closeMore: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'light',
      isSidebarOpen: true,
      isMoreOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      openMore: () => set({ isMoreOpen: true }),
      closeMore: () => set({ isMoreOpen: false }),
    }),
    {
      name: 'lexora-ui',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
