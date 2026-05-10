import { Badge } from '../ui/badge.jsx'

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <Badge variant="teal" className="mb-3">{eyebrow}</Badge> : null}
        <h1 className="text-3xl font-semibold text-foreground md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-3">{action}</div> : null}
    </div>
  )
}
