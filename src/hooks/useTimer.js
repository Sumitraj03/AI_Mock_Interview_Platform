import { useEffect, useMemo, useState } from 'react'

export function useTimer(active = false) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!active) return undefined
    const interval = window.setInterval(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearInterval(interval)
  }, [active])

  const label = useMemo(() => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [seconds])

  return { seconds, label, reset: () => setSeconds(0) }
}
