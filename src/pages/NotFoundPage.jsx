import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent } from '../components/ui/card.jsx'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-svh place-items-center bg-muted/35 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">404</p>
          <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">This route is not part of the InterviewPilot AI workspace.</p>
          <Button className="mt-6" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
