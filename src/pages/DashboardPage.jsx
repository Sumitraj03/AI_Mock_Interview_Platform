import { BarChart3, BrainCircuit, Clock3, Target } from 'lucide-react'
import { CategoryBarChart } from '../components/charts/CategoryBarChart.jsx'
import { ScoreTrendChart } from '../components/charts/ScoreTrendChart.jsx'
import { MetricCard } from '../components/dashboard/MetricCard.jsx'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Progress } from '../components/ui/progress.jsx'
import { analyticsSummary } from '../services/mockData.js'
import { useInterviewStore } from '../store/useInterviewStore.js'

const metricIcons = [Target, BarChart3, Clock3, BrainCircuit]

export default function DashboardPage() {
  const sessions = useInterviewStore((state) => state.sessions)
  const averageScore = useInterviewStore((state) => state.averageScore())

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Interview readiness cockpit"
        description="Track your recent mock rounds, category performance, score trends, and next best practice actions."
        action={<Button variant="premium">Schedule mock</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsSummary.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} icon={metricIcons[index]} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Score and confidence trend</CardTitle>
            <p className="text-sm text-muted-foreground">Weekly improvement based on completed mock interviews.</p>
          </CardHeader>
          <CardContent>
            <ScoreTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Category performance</CardTitle>
            <p className="text-sm text-muted-foreground">Find your strongest and weakest interview areas.</p>
          </CardHeader>
          <CardContent>
            <CategoryBarChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Readiness plan</CardTitle>
            <p className="text-sm text-muted-foreground">Your current plan based on recent sessions.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Overall readiness</span>
                <span className="font-semibold">{averageScore}%</span>
              </div>
              <Progress value={averageScore} className="mt-2" />
            </div>
            {['Practice one system design answer', 'Record a 20 minute React mock', 'Add metrics to HR stories'].map((task, index) => (
              <div key={task} className="flex items-center gap-3 rounded-md border p-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground">
                  {index + 1}
                </span>
                <span className="text-sm">{task}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent sessions</CardTitle>
            <p className="text-sm text-muted-foreground">Last completed interviews and quick notes.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.slice(0, 4).map((session) => (
              <div key={session.id} className="flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{session.title}</p>
                    <Badge variant="outline">{session.category}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{session.notes}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{session.duration}</span>
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-sm font-semibold text-secondary-foreground">{session.score}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
