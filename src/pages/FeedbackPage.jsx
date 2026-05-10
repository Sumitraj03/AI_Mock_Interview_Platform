import { useState } from 'react'
import { Loader2, MessageSquareText, Sparkles } from 'lucide-react'
import { RubricChart } from '../components/charts/RubricChart.jsx'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Label } from '../components/ui/label.jsx'
import { Progress } from '../components/ui/progress.jsx'
import { Textarea } from '../components/ui/textarea.jsx'
import { useToast } from '../hooks/useToast.js'
import { isMockMode } from '../lib/config.js'
import { scoreColor } from '../lib/utils.js'
import { generateFeedback } from '../services/aiService.js'
import { useInterviewStore } from '../store/useInterviewStore.js'

const starterTranscript = `I explained React reconciliation, component keys, and why stable identity matters. I also discussed when useMemo helps and when it can add complexity. I struggled a bit when asked to design the data flow for a collaborative dashboard.`

function InsightList({ title, items, variant = 'teal' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border p-3 text-sm leading-6 text-muted-foreground">
            <Badge variant={variant} className="mb-2">{title}</Badge>
            <p>{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function FeedbackPage() {
  const { toast } = useToast()
  const feedback = useInterviewStore((state) => state.feedback)
  const setFeedback = useInterviewStore((state) => state.setFeedback)
  const addSession = useInterviewStore((state) => state.addSession)
  const [transcript, setTranscript] = useState(starterTranscript)
  const [loading, setLoading] = useState(false)

  async function handleAnalyze() {
    setLoading(true)
    try {
      const nextFeedback = await generateFeedback({ transcript })
      setFeedback(nextFeedback)
      addSession({
        title: 'AI feedback review',
        duration: '18 min',
        score: nextFeedback.score,
        category: 'Feedback',
        notes: nextFeedback.verdict,
      })
      toast({
        title: isMockMode.ai ? 'Mock feedback ready' : 'AI feedback ready',
        description: 'Your report was added to interview history.',
        variant: 'success',
      })
    } catch (error) {
      toast({ title: 'Feedback failed', description: error.message || 'Please try again.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="AI Feedback"
        title="Turn interview notes into a coaching report"
        description="Paste a transcript, answer notes, or self-review. OpenAI can power this in production, while mock feedback keeps the app runnable."
        action={
          <Button variant="premium" onClick={handleAnalyze} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Analyze
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Transcript or notes</CardTitle>
            <p className="text-sm text-muted-foreground">Use real notes after a mock call or keep the starter text for demo mode.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Label htmlFor="transcript">Interview content</Label>
            <Textarea id="transcript" value={transcript} onChange={(event) => setTranscript(event.target.value)} className="min-h-64" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current score</CardTitle>
            <p className="text-sm text-muted-foreground">{feedback.verdict}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="shrink-0">
                <p className={`text-7xl font-semibold ${scoreColor(feedback.score)}`}>{feedback.score}</p>
                <p className="text-sm text-muted-foreground">Interview score</p>
              </div>
              <div className="flex-1 space-y-4">
                {feedback.rubric.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Rubric map</CardTitle>
          </CardHeader>
          <CardContent>
            <RubricChart data={feedback.rubric} />
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          <InsightList title="Strengths" items={feedback.strengths} variant="success" />
          <InsightList title="Weaknesses" items={feedback.weaknesses} variant="warning" />
          <InsightList title="Suggestions" items={feedback.suggestions} variant="teal" />
        </div>
      </div>

      <Card>
        <CardContent className="flex items-start gap-3 p-5">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
            <MessageSquareText className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold">Next answer drill</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Record a two minute answer to one saved question, then paste notes here and compare the new score with this report.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
