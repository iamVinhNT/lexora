/**
 * @file ui.store.ts
 * @description Zustand state for shell-only UI presentation state with backwards-compatible theme delegation.
 */
import { create } from 'zustand';

import { applyTheme, type Theme, useThemeStore } from './theme.store';

export { applyTheme, type Theme, useThemeStore };

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

export const useUiStore = create<UiState>()((set) => ({
  theme: useThemeStore.getState().theme,
  isSidebarOpen: true,
  isMoreOpen: false,
  setTheme: (theme) => {
    useThemeStore.getState().setTheme(theme);
    set({ theme });
  },
  toggleTheme: () => {
    useThemeStore.getState().toggleTheme();
    set({ theme: useThemeStore.getState().theme });
  },
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  openMore: () => set({ isMoreOpen: true }),
  closeMore: () => set({ isMoreOpen: false }),
}));

useThemeStore.subscribe((state) => {
  if (useUiStore.getState().theme !== state.theme) {
    useUiStore.setState({ theme: state.theme });
  }
});

useUiStore.subscribe((state, prevState) => {
  if (state.theme !== prevState.theme && state.theme !== useThemeStore.getState().theme) {
    useThemeStore.getState().setTheme(state.theme);
  }
});
