import { Link } from 'react-router-dom'
import { BrainCircuit } from 'lucide-react'
import { cn } from '../../lib/utils.js'

export function Logo({ className, to = '/' }) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2 font-semibold', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-teal-500 text-slate-950 shadow-glow">
        <BrainCircuit className="h-5 w-5" />
      </span>
      <span>InterviewPilot AI</span>
    </Link>
  )
}
