import { create } from 'zustand'

let toastId = 0

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `${Date.now()}-${toastId++}`
    set((state) => ({
      toasts: [...state.toasts, { id, variant: 'default', ...toast }],
    }))
    return id
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))
