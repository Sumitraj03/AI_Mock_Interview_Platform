import { useState } from 'react'
import { Database, KeyRound, Moon, Sun, Video } from 'lucide-react'
import { useAuthSession } from '../components/auth/AuthProvider.jsx'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { Switch } from '../components/ui/switch.jsx'
import { useToast } from '../hooks/useToast.js'
import { isMockMode } from '../lib/config.js'
import { useAppStore } from '../store/useAppStore.js'

const services = [
  { label: 'Clerk Auth', key: 'auth', icon: KeyRound },
  { label: 'Supabase', key: 'database', icon: Database },
  { label: 'OpenAI', key: 'ai', icon: Sun },
  { label: 'Stream Video', key: 'video', icon: Video },
]

export default function SettingsPage() {
  const { user, updateUser } = useAuthSession()
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Frontend Developer',
  })

  function saveProfile() {
    updateUser(profile)
    toast({ title: 'Profile updated', description: 'Your workspace profile was saved locally.', variant: 'success' })
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Workspace and profile settings"
        description="Manage theme, profile information, and integration status for production deployment."
      />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <p className="text-sm text-muted-foreground">Editable in mock mode. Clerk profile data appears here when configured.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={profile.name} onChange={(event) => setProfile((state) => ({ ...state, name: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={profile.email} onChange={(event) => setProfile((state) => ({ ...state, email: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Target role</Label>
              <Input id="role" value={profile.role} onChange={(event) => setProfile((state) => ({ ...state, role: event.target.value }))} />
            </div>
            <Button onClick={saveProfile}>Save profile</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </span>
                <div>
                  <p className="font-medium">Dark mode</p>
                  <p className="text-sm text-muted-foreground">Switch the dashboard theme.</p>
                </div>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration status</CardTitle>
              <p className="text-sm text-muted-foreground">Missing keys automatically fall back to mock mode.</p>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon
                const mocked = isMockMode[service.key]
                return (
                  <div key={service.key} className="rounded-md border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <Badge variant={mocked ? 'warning' : 'success'}>{mocked ? 'Mock' : 'Live'}</Badge>
                    </div>
                    <p className="mt-3 font-medium">{service.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {mocked ? 'Using local demo data' : 'Connected through environment variables'}
                    </p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
