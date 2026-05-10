import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function initials(name = 'Interview Pilot') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function scoreColor(score) {
  if (score >= 85) return 'text-emerald-500'
  if (score >= 70) return 'text-teal-500'
  if (score >= 55) return 'text-amber-500'
  return 'text-rose-500'
}
