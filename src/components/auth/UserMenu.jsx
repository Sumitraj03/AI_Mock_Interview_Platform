import { Link } from 'react-router-dom'
import { LogOut, Settings, UserRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { Button } from '../ui/button.jsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.jsx'
import { useAuthSession } from './AuthProvider.jsx'

export function UserMenu() {
  const { user, signOut } = useAuthSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto gap-3 px-2 py-1.5">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} alt={user?.name} />
            <AvatarFallback name={user?.name} />
          </Avatar>
          <span className="hidden min-w-0 text-left md:block">
            <span className="block truncate text-sm font-semibold">{user?.name || 'Candidate'}</span>
            <span className="block truncate text-xs text-muted-foreground">{user?.role || 'Frontend Developer'}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <span className="block truncate">{user?.name || 'Candidate'}</span>
          <span className="block truncate text-xs font-normal text-muted-foreground">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/app/settings">
            <UserRound className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/settings">
            <Settings className="h-4 w-4" />
            Preferences
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={signOut}>
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
