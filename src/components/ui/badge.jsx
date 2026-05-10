import { cn } from '../../lib/utils.js'

const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-input bg-background',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
  teal: 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
}

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
