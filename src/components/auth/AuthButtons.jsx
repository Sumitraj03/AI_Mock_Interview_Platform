import { Link } from 'react-router-dom'
import { SignInButton, SignUpButton } from '@clerk/clerk-react'
import { ArrowRight } from 'lucide-react'
import { serviceConfig } from '../../lib/config.js'
import { Button } from '../ui/button.jsx'
import { useAuthSession } from './AuthProvider.jsx'

function ClerkButtons({ compact = false }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SignInButton mode="modal" forceRedirectUrl="/app">
        <Button variant={compact ? 'ghost' : 'outline'}>Login</Button>
      </SignInButton>
      <SignUpButton mode="modal" forceRedirectUrl="/app">
        <Button variant="premium">
          Start free
          <ArrowRight className="h-4 w-4" />
        </Button>
      </SignUpButton>
    </div>
  )
}

function MockButtons({ compact = false }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant={compact ? 'ghost' : 'outline'} asChild>
        <Link to="/sign-in">Login</Link>
      </Button>
      <Button variant="premium" asChild>
        <Link to="/sign-up">
          Start free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export function AuthButtons({ compact = false }) {
  const { isSignedIn } = useAuthSession()

  if (isSignedIn) {
    return (
      <Button variant="premium" asChild>
        <Link to="/app">
          Open dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    )
  }

  return serviceConfig.clerk.enabled ? <ClerkButtons compact={compact} /> : <MockButtons compact={compact} />
}
