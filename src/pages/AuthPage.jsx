import { Link, Navigate } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'
import { MockAuthForm } from '../components/auth/MockAuthForm.jsx'
import { useAuthSession } from '../components/auth/AuthProvider.jsx'
import { Logo } from '../components/shared/Logo.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { serviceConfig } from '../lib/config.js'

export default function AuthPage({ mode = 'sign-in' }) {
  const { isSignedIn } = useAuthSession()
  const isSignUp = mode === 'sign-up'

  if (isSignedIn) {
    return <Navigate to="/app" replace />
  }

  return (
    <div className="min-h-svh bg-muted/35">
      <div className="container flex min-h-svh flex-col py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
        </div>
        <div className="grid flex-1 place-items-center py-10">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">{isSignUp ? 'Create your workspace' : 'Welcome back'}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {serviceConfig.clerk.enabled
                  ? 'Clerk is active for secure authentication.'
                  : 'Demo auth is active. Add Clerk keys when you want production auth.'}
              </p>
            </CardHeader>
            <CardContent>
              {serviceConfig.clerk.enabled ? (
                isSignUp ? (
                  <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/app" />
                ) : (
                  <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/app" />
                )
              ) : (
                <MockAuthForm mode={mode} />
              )}
              <p className="mt-5 text-center text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : 'New to InterviewPilot?'}{' '}
                <Link className="font-medium text-foreground underline underline-offset-4" to={isSignUp ? '/sign-in' : '/sign-up'}>
                  {isSignUp ? 'Login' : 'Create account'}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
