import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { RequireAuth } from './components/auth/RequireAuth.jsx'
import { useThemeSync } from './hooks/useThemeSync.js'
import { DashboardLayout } from './layouts/DashboardLayout.jsx'
import { MarketingLayout } from './layouts/MarketingLayout.jsx'

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const QuestionsPage = lazy(() => import('./pages/QuestionsPage.jsx'))
const InterviewPage = lazy(() => import('./pages/InterviewPage.jsx'))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage.jsx'))
const HistoryPage = lazy(() => import('./pages/HistoryPage.jsx'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage.jsx'))
const SettingsPage = lazy(() => import('./pages/SettingsPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function RouteFallback() {
  return (
    <div className="grid min-h-svh place-items-center bg-background">
      <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground shadow-soft">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Loading InterviewPilot AI
      </div>
    </div>
  )
}

export default function App() {
  useThemeSync()

  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="sign-in" element={<AuthPage mode="sign-in" />} />
            <Route path="sign-up" element={<AuthPage mode="sign-up" />} />
          </Route>

          <Route
            path="app"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="interview" element={<InterviewPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="dashboard" element={<Navigate to="/app" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
