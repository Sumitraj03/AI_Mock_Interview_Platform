import {
  BarChart3,
  BrainCircuit,
  ClipboardList,
  History,
  LayoutDashboard,
  Settings,
  Video,
} from 'lucide-react'

export const dashboardNav = [
  { title: 'Dashboard', href: '/app', icon: LayoutDashboard, end: true },
  { title: 'Questions', href: '/app/questions', icon: BrainCircuit },
  { title: 'Mock Room', href: '/app/interview', icon: Video },
  { title: 'AI Feedback', href: '/app/feedback', icon: ClipboardList },
  { title: 'History', href: '/app/history', icon: History },
  { title: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { title: 'Settings', href: '/app/settings', icon: Settings },
]
