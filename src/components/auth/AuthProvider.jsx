import { createContext, lazy, Suspense, useContext, useEffect, useMemo, useState } from 'react'
import { appConfig, serviceConfig } from '../../lib/config.js'
import { Skeleton } from '../ui/skeleton.jsx'

export const AuthContext = createContext(null)
const storageKey = 'interviewpilot_mock_user'
const ClerkAuthProvider = lazy(() => import('./ClerkAuthProvider.jsx'))

function readStoredUser() {
  try {
    const stored = window.localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function MockAuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(storageKey, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(storageKey)
    }
  }, [user])

  const value = useMemo(
    () => ({
      provider: 'mock',
      isLoaded: true,
      isSignedIn: Boolean(user),
      user,
      signIn: ({ email, name } = {}) => {
        const nextUser = {
          ...appConfig.demoUser,
          email: email || appConfig.demoUser.email,
          name: name || appConfig.demoUser.name,
        }
        setUser(nextUser)
        return nextUser
      },
      signUp: ({ email, name } = {}) => {
        const nextUser = {
          ...appConfig.demoUser,
          id: `demo-${Date.now()}`,
          email: email || appConfig.demoUser.email,
          name: name || appConfig.demoUser.name,
        }
        setUser(nextUser)
        return nextUser
      },
      signOut: () => setUser(null),
      updateUser: (patch) => setUser((current) => ({ ...current, ...patch })),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AppAuthProvider({ children }) {
  if (serviceConfig.clerk.enabled) {
    return (
      <Suspense
        fallback={
          <div className="grid min-h-svh place-items-center bg-background p-6">
            <div className="w-full max-w-sm space-y-4 rounded-lg border bg-card p-6 shadow-soft">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        }
      >
        <ClerkAuthProvider>{children}</ClerkAuthProvider>
      </Suspense>
    )
  }

  return <MockAuthProvider>{children}</MockAuthProvider>
}

export function useAuthSession() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthSession must be used inside AppAuthProvider')
  }
  return context
}
