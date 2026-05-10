import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '../ui/card.jsx'
import { cn } from '../../lib/utils.js'

const toneMap = {
  teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-300',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
}

export function MetricCard({ label, value, change, icon: Icon, tone = 'teal' }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </div>
          {Icon ? (
            <span className={cn('grid h-10 w-10 place-items-center rounded-md', toneMap[tone])}>
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {change} this month
        </div>
      </CardContent>
    </Card>
  )
}
