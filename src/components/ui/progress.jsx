import { cn } from '../../lib/utils.js'

export function Progress({ value = 0, className }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  )
}
