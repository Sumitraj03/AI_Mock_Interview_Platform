import { useMemo, useState } from 'react'
import { Loader2, Save, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Label } from '../components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx'
import { Skeleton } from '../components/ui/skeleton.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { useToast } from '../hooks/useToast.js'
import { isMockMode } from '../lib/config.js'
import { generateQuestions } from '../services/aiService.js'
import { useInterviewStore } from '../store/useInterviewStore.js'

const categories = ['All', 'Frontend', 'JavaScript', 'System Design', 'HR']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']
const types = ['All', 'Technical', 'Behavioral']

export default function QuestionsPage() {
  const { toast } = useToast()
  const generatedQuestions = useInterviewStore((state) => state.generatedQuestions)
  const savedQuestions = useInterviewStore((state) => state.savedQuestions)
  const setGeneratedQuestions = useInterviewStore((state) => state.setGeneratedQuestions)
  const saveQuestion = useInterviewStore((state) => state.saveQuestion)
  const [filters, setFilters] = useState({ category: 'All', difficulty: 'Medium', type: 'Technical', count: '5' })
  const [isGenerating, setGenerating] = useState(false)

  const savedIds = useMemo(() => new Set(savedQuestions.map((question) => question.id)), [savedQuestions])

  async function handleGenerate() {
    setGenerating(true)
    try {
      const questions = await generateQuestions(filters)
      setGeneratedQuestions(questions.slice(0, Number(filters.count)))
      toast({
        title: isMockMode.ai ? 'Mock questions generated' : 'AI questions generated',
        description: isMockMode.ai ? 'Add OpenAI env vars to switch to live AI generation.' : 'Your new set is ready.',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Question generation failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="AI Question Generator"
        title="Generate targeted interview questions"
        description="Pick difficulty, category, and interview style. Mock data is active until OpenAI credentials are configured."
        action={
          <Button variant="premium" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate
          </Button>
        }
      />

      <Card>
        <CardContent className="grid gap-4 p-5 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={filters.category} onValueChange={(value) => setFilters((state) => ({ ...state, category: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select value={filters.difficulty} onValueChange={(value) => setFilters((state) => ({ ...state, difficulty: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{difficulties.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={filters.type} onValueChange={(value) => setFilters((state) => ({ ...state, type: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{types.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Count</Label>
            <Select value={filters.count} onValueChange={(value) => setFilters((state) => ({ ...state, count: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{['3', '5', '8'].map((item) => <SelectItem key={item} value={item}>{item} questions</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="generated">
        <TabsList>
          <TabsTrigger value="generated">Generated</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="generated">
          <div className="grid gap-4 lg:grid-cols-2">
            {isGenerating
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="space-y-4 p-5">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-9 w-28" />
                    </CardContent>
                  </Card>
                ))
              : generatedQuestions.map((question) => (
                  <Card key={question.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="teal">{question.category}</Badge>
                        <Badge variant="outline">{question.difficulty}</Badge>
                        <Badge variant="secondary">{question.type}</Badge>
                      </div>
                      <CardTitle className="leading-6">{question.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between gap-4">
                      <div className="space-y-2">
                        {question.hints.map((hint) => (
                          <div key={hint} className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">{hint}</div>
                        ))}
                      </div>
                      <Button
                        variant={savedIds.has(question.id) ? 'secondary' : 'outline'}
                        onClick={() => saveQuestion(question)}
                        disabled={savedIds.has(question.id)}
                        className="self-start"
                      >
                        <Save className="h-4 w-4" />
                        {savedIds.has(question.id) ? 'Saved' : 'Save question'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          {savedQuestions.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {savedQuestions.map((question) => (
                <Card key={question.id}>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">{question.category}</Badge>
                    <CardTitle>{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{question.hints.join(' • ')}</CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">No saved questions yet. Save useful prompts from the generated tab.</CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
