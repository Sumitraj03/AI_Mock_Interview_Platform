import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { Input } from '../ui/input.jsx'
import { Label } from '../ui/label.jsx'
import { useToast } from '../../hooks/useToast.js'
import { appConfig } from '../../lib/config.js'
import { useAuthSession } from './AuthProvider.jsx'

export function MockAuthForm({ mode = 'sign-in' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuthSession()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: appConfig.demoUser.name,
    email: appConfig.demoUser.email,
  })

  const from = location.state?.from || '/app'

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 550))
    if (mode === 'sign-up') {
      signUp(form)
    } else {
      signIn(form)
    }
    setIsSubmitting(false)
    toast({
      title: mode === 'sign-up' ? 'Workspace created' : 'Welcome back',
      description: 'Mock auth is active until Clerk keys are added.',
      variant: 'success',
    })
    navigate(from, { replace: true })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {mode === 'sign-up' ? (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))} />
        </div>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
          required
        />
      </div>
      <Button className="w-full" variant="premium" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {mode === 'sign-up' ? 'Create demo account' : 'Continue to dashboard'}
      </Button>
    </form>
  )
}
