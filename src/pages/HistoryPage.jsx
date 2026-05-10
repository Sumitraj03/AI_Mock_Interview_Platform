import { format } from 'date-fns'
import { CalendarDays, FileText } from 'lucide-react'
import { ScoreTrendChart } from '../components/charts/ScoreTrendChart.jsx'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { scoreColor } from '../lib/utils.js'
import { useInterviewStore } from '../store/useInterviewStore.js'

export default function HistoryPage() {
  const sessions = useInterviewStore((state) => state.sessions)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="History"
        title="Interview session history"
        description="Review previous mock sessions, scores, categories, notes, and your progress over time."
      />

      <Card>
        <CardHeader>
          <CardTitle>Score history</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreTrendChart />
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{session.title}</h2>
                    <Badge variant="outline">{session.category}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{session.notes}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {format(new Date(session.date), 'MMM d, yyyy')}
                    </span>
                    <span>{session.duration}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-md border px-4 py-3 text-center">
                <p className={`text-2xl font-semibold ${scoreColor(session.score)}`}>{session.score}%</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
