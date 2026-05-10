import { Navigate, useLocation } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton.jsx'
import { useAuthSession } from './AuthProvider.jsx'

export function RequireAuth({ children }) {
  const location = useLocation()
  const { isLoaded, isSignedIn } = useAuthSession()

  if (!isLoaded) {
    return (
      <div className="grid min-h-svh place-items-center bg-background p-6">
        <div className="w-full max-w-sm space-y-4 rounded-lg border bg-card p-6 shadow-soft">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }

  return children
}
