import { useEffect, useState } from 'react'
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { Loader2 } from 'lucide-react'
import { useAuthSession } from '../auth/AuthProvider.jsx'
import { Card, CardContent } from '../ui/card.jsx'
import { serviceConfig } from '../../lib/config.js'
import { getStreamUserToken } from '../../services/videoService.js'

export function StreamVideoRoom({ roomId }) {
  const { user } = useAuthSession()
  const [client, setClient] = useState(null)
  const [call, setCall] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let currentClient
    let currentCall

    async function joinCall() {
      try {
        const token = await getStreamUserToken(user)
        if (!token) throw new Error('Missing Stream token')
        currentClient = new StreamVideoClient({
          apiKey: serviceConfig.stream.apiKey,
          user: {
            id: user.id,
            name: user.name,
            image: user.imageUrl,
          },
          token,
        })
        currentCall = currentClient.call('default', roomId)
        await currentCall.join({ create: true })
        if (active) {
          setClient(currentClient)
          setCall(currentCall)
        }
      } catch (err) {
        if (active) setError(err.message || 'Unable to join Stream call')
      }
    }

    joinCall()

    return () => {
      active = false
      currentCall?.leave()
      currentClient?.disconnectUser()
    }
  }, [roomId, user])

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-destructive">{error}</CardContent>
      </Card>
    )
  }

  if (!client || !call) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 p-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting to Stream room...
        </CardContent>
      </Card>
    )
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme className="rounded-lg border bg-card p-3">
          <SpeakerLayout />
          <CallControls />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  )
}
