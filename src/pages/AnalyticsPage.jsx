import { AreaChart, BadgeCheck, BrainCircuit, TrendingUp } from 'lucide-react'
import { CategoryBarChart } from '../components/charts/CategoryBarChart.jsx'
import { ScoreTrendChart } from '../components/charts/ScoreTrendChart.jsx'
import { MetricCard } from '../components/dashboard/MetricCard.jsx'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'

const analyticsMetrics = [
  { label: 'Best category', value: 'React', change: '+8%', tone: 'teal', icon: BrainCircuit },
  { label: 'Consistency', value: '6 wk', change: '+2', tone: 'emerald', icon: TrendingUp },
  { label: 'Highest score', value: '91%', change: '+4%', tone: 'amber', icon: BadgeCheck },
  { label: 'Mock rounds', value: '18', change: '+5', tone: 'rose', icon: AreaChart },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Analytics"
        title="Progress analytics for interview prep"
        description="A recruiter-friendly analytics module showing data visualization, reusable charts, and clean insight cards."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Score progression</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skill coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryBarChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI insights</CardTitle>
          <p className="text-sm text-muted-foreground">Summary generated from recent mock data.</p>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {[
            'React and CSS answers are interview-ready for fresher roles.',
            'System design needs a repeatable structure before coding details.',
            'Behavioral answers improve when each story includes one metric.',
          ].map((insight) => (
            <div key={insight} className="rounded-md border bg-muted/35 p-4 text-sm leading-6 text-muted-foreground">{insight}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
