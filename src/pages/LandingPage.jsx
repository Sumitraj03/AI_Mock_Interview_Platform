import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, MessageSquareText, Sparkles, Video } from 'lucide-react'
import { AuthButtons } from '../components/auth/AuthButtons.jsx'
import { Logo } from '../components/shared/Logo.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { featureList, pricingPlans, testimonials } from '../services/mockData.js'
import { currency } from '../lib/utils.js'

const iconMap = [BrainCircuit, Video, MessageSquareText, BarChart3]

function ProductBackdrop() {
  return (
    <div className="absolute inset-0 hero-mask overflow-hidden bg-slate-950 product-grid">
      <div className="absolute left-1/2 top-[44%] w-[min(1040px,94vw)] -translate-x-1/2 rounded-lg border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md md:p-5">
        <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-white/10 bg-slate-950/80 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-teal-200">Live mock interview</p>
                <p className="mt-1 text-lg font-semibold">Frontend Engineer Round</p>
              </div>
              <Badge variant="teal">00:24:18</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="aspect-video rounded-lg bg-slate-800 p-3">
                <div className="h-full rounded-md bg-[linear-gradient(135deg,#0f766e,#f97316)] opacity-80" />
              </div>
              <div className="aspect-video rounded-lg bg-slate-800 p-3">
                <div className="h-full rounded-md border border-white/15 bg-slate-900">
                  <div className="mx-auto mt-8 grid h-14 w-14 place-items-center rounded-full bg-teal-400 text-slate-950">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-teal-100">Current prompt</p>
              <p className="mt-2 text-sm text-slate-200">
                Explain React reconciliation and when you would avoid premature memoization.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-lg border border-white/10 bg-white/90 p-4 text-slate-950">
              <p className="text-sm font-semibold">Readiness score</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-semibold">87</span>
                <span className="pb-2 text-sm text-slate-500">+12 this month</span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2">
                {[42, 54, 60, 68, 78, 87].map((height) => (
                  <div key={height} className="flex-1 rounded-t bg-teal-500" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-900/85 p-4 text-white">
              <p className="text-sm font-semibold">AI feedback</p>
              <div className="mt-3 space-y-2">
                {['Ask clarifying questions first', 'Give measurable outcomes', 'Close with concise summary'].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-md bg-white/7 px-3 py-2 text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-teal-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Logo className="text-white" />
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#testimonials" className="hover:text-white">Results</a>
          </nav>
          <AuthButtons compact />
        </div>
      </header>

      <section className="relative min-h-[92svh] overflow-hidden pt-16 text-white">
        <ProductBackdrop />
        <div className="container relative z-10 flex min-h-[78svh] items-start pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Badge variant="teal" className="border border-teal-300/20 bg-teal-300/15 text-teal-100">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              AI interview practice for frontend candidates
            </Badge>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-7xl">InterviewPilot AI</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-xl">
              Generate realistic questions, join mock video rooms, receive actionable AI feedback, and track your
              interview readiness like a polished SaaS product.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AuthButtons />
              <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15" asChild>
                <a href="#features">
                  Explore features
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="border-y bg-background py-20">
        <div className="container">
          <div className="max-w-2xl">
            <Badge variant="secondary">Platform</Badge>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">A full interview prep cockpit.</h2>
            <p className="mt-4 text-muted-foreground">
              Built as a resume-ready frontend SaaS: protected routes, state management, service adapters, charts,
              animations, responsive layouts, and production deployment notes.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureList.map((feature, index) => {
              const Icon = iconMap[index]
              return (
                <Card key={feature.title} className="bg-card/80">
                  <CardHeader>
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-muted/40 py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <Badge variant="teal">Candidate results</Badge>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Practice that feels close to the real round.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardContent className="p-5">
                    <p className="text-sm leading-6 text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="mt-5">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-y bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary">Pricing</Badge>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Start free, scale when interviews get serious.</h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={plan.highlighted ? 'border-teal-500 shadow-glow' : ''}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="pt-3">
                    <span className="text-4xl font-semibold">{currency(plan.price)}</span>
                    <span className="text-sm text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-teal-500" />
                      {feature}
                    </div>
                  ))}
                  <Button className="mt-4 w-full" variant={plan.highlighted ? 'premium' : 'outline'} asChild>
                    <Link to="/sign-up">Choose {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="container flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold md:text-5xl">Ready for your next interview?</h2>
            <p className="mt-4 max-w-2xl text-slate-300">Launch the dashboard, generate a question set, and run a mock room in minutes.</p>
          </div>
          <Button variant="premium" size="lg" asChild>
            <Link to="/sign-up">
              Start practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
