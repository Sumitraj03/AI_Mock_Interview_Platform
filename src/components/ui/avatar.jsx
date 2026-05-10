import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn, initials } from '../../lib/utils.js'

export function Avatar({ className, ...props }) {
  return <AvatarPrimitive.Root className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
}

export function AvatarImage({ className, ...props }) {
  return <AvatarPrimitive.Image className={cn('aspect-square h-full w-full', className)} {...props} />
}

export function AvatarFallback({ className, name = 'Interview Pilot', ...props }) {
  return (
    <AvatarPrimitive.Fallback
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground', className)}
      {...props}
    >
      {initials(name)}
    </AvatarPrimitive.Fallback>
  )
}
