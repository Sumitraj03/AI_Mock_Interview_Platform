import { useMemo } from 'react'
import { ClerkProvider, useClerk, useUser } from '@clerk/clerk-react'
import { serviceConfig } from '../../lib/config.js'
import { AuthContext } from './AuthProvider.jsx'

function normalizeClerkUser(user) {
  return {
    id: user?.id,
    name: user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || 'Candidate',
    email: user?.primaryEmailAddress?.emailAddress || '',
    imageUrl: user?.imageUrl || '',
    role: user?.publicMetadata?.role || 'Frontend Developer',
  }
}

function ClerkBridge({ children }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  const value = useMemo(
    () => ({
      provider: 'clerk',
      isLoaded,
      isSignedIn: Boolean(isSignedIn),
      user: isSignedIn ? normalizeClerkUser(user) : null,
      signIn: null,
      signUp: null,
      signOut: () => signOut({ redirectUrl: '/' }),
      updateUser: () => {},
    }),
    [isLoaded, isSignedIn, signOut, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function ClerkAuthProvider({ children }) {
  return (
    <ClerkProvider publishableKey={serviceConfig.clerk.publishableKey} afterSignOutUrl="/">
      <ClerkBridge>{children}</ClerkBridge>
    </ClerkProvider>
  )
}
