import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function systemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useAppStore = create(
  persist(
    (set) => ({
      theme: systemTheme(),
      sidebarOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: 'interviewpilot_app',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
