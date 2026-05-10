import { NavLink, Outlet } from 'react-router-dom'
import { Menu, Moon, PanelLeftClose, Sun } from 'lucide-react'
import { dashboardNav } from '../lib/navigation.js'
import { cn } from '../lib/utils.js'
import { useAppStore } from '../store/useAppStore.js'
import { Button } from '../components/ui/button.jsx'
import { Logo } from '../components/shared/Logo.jsx'
import { UserMenu } from '../components/auth/UserMenu.jsx'

function Sidebar({ mobile = false }) {
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen)

  return (
    <aside
      className={cn(
        'flex h-full w-72 flex-col border-r bg-card/80 backdrop-blur-xl',
        mobile ? 'w-full' : 'hidden lg:flex',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-5">
        <Logo to="/app" />
        {mobile ? (
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        ) : null}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {dashboardNav.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                isActive && 'bg-secondary text-secondary-foreground',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
      </nav>
      <div className="m-3 rounded-lg border bg-background p-4">
        <p className="text-sm font-semibold">Interview readiness</p>
        <div className="mt-3 h-2 rounded-full bg-muted">
          <div className="h-full w-[82%] rounded-full bg-teal-500" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">82% average across recent mocks</p>
      </div>
    </aside>
  )
}

export function DashboardLayout() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen)
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen)
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  return (
    <div className="min-h-svh bg-muted/35">
      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
          <div className="relative h-full max-w-80">
            <Sidebar mobile />
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex min-h-svh max-w-[1600px]">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/85 px-4 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold">Candidate workspace</p>
                <p className="text-xs text-muted-foreground">Practice, review, and improve every round</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <UserMenu />
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
