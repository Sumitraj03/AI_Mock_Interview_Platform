import { useToastStore } from '../store/useToastStore.js'

export function useToast() {
  const addToast = useToastStore((state) => state.addToast)

  return {
    toast: (toast) => {
      const id = addToast(toast)
      window.setTimeout(() => {
        useToastStore.getState().removeToast(id)
      }, toast.duration || 4200)
      return id
    },
  }
}
