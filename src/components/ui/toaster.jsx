import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useToastStore } from '../../store/useToastStore.js'
import { cn } from '../../lib/utils.js'

const iconMap = {
  default: Info,
  success: CheckCircle2,
  destructive: TriangleAlert,
}

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  return (
    <div className="fixed right-4 top-4 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.variant] || Info
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.96 }}
              className={cn(
                'rounded-lg border bg-card p-4 text-card-foreground shadow-soft',
                toast.variant === 'destructive' && 'border-destructive/30',
              )}
            >
              <div className="flex gap-3">
                <Icon
                  className={cn(
                    'mt-0.5 h-5 w-5 text-teal-500',
                    toast.variant === 'destructive' && 'text-destructive',
                    toast.variant === 'success' && 'text-emerald-500',
                  )}
                />
                <div className="min-w-0 flex-1">
                  {toast.title ? <p className="text-sm font-semibold">{toast.title}</p> : null}
                  {toast.description ? <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p> : null}
                </div>
                <button
                  type="button"
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => removeToast(toast.id)}
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
