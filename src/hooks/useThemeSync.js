import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore.js'

export function useThemeSync() {
  const theme = useAppStore((state) => state.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])
}
