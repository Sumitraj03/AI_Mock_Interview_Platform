import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Camera, CameraOff, Copy, LogOut, Mic, MicOff, Play, Video } from 'lucide-react'
import { PageHeader } from '../components/shared/PageHeader.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Input } from '../components/ui/input.jsx'
import { Label } from '../components/ui/label.jsx'
import { useAuthSession } from '../components/auth/AuthProvider.jsx'
import { useMediaStream } from '../hooks/useMediaStream.js'
import { useTimer } from '../hooks/useTimer.js'
import { useToast } from '../hooks/useToast.js'
import { isMockMode, serviceConfig } from '../lib/config.js'
import { createRoomId } from '../services/videoService.js'
import { useInterviewStore } from '../store/useInterviewStore.js'

const StreamVideoRoom = lazy(() =>
  import('../components/interview/StreamVideoRoom.jsx').then((module) => ({ default: module.StreamVideoRoom })),
)

function LocalMockRoom({ roomId, onEnd }) {
  const videoRef = useRef(null)
  const media = useMediaStream()
  const { start, stop } = media
  const timer = useTimer(true)
  const generatedQuestions = useInterviewStore((state) => state.generatedQuestions)
  const prompt = generatedQuestions[0]

  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  useEffect(() => {
    if (videoRef.current && media.stream) {
      videoRef.current.srcObject = media.stream
    }
  }, [media.stream])

  return (
    <div className="grid gap-4 xl:grid-cols-[1.35fr_0.75fr]">
      <Card className="overflow-hidden bg-slate-950 text-white">
        <CardHeader className="flex-row items-center justify-between border-b border-white/10">
          <div>
            <CardTitle>Room {roomId}</CardTitle>
            <p className="text-sm text-slate-300">{isMockMode.video ? 'Browser media mock room' : 'Stream fallback room'}</p>
          </div>
          <Badge variant="teal">{timer.label}</Badge>
        </CardHeader>
        <CardContent className="p-4">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-900">
            {media.stream ? (
              <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center p-6 text-center text-sm text-slate-300">
                {media.error || 'Camera preview appears here after permission is granted.'}
              </div>
            )}
            <div className="absolute left-4 top-4 rounded-md bg-slate-950/70 px-3 py-1 text-xs">You</div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button variant={media.isMicOn ? 'secondary' : 'destructive'} size="icon" onClick={media.toggleMic} aria-label="Toggle microphone">
              {media.isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button variant={media.isCameraOn ? 'secondary' : 'destructive'} size="icon" onClick={media.toggleCamera} aria-label="Toggle camera">
              {media.isCameraOn ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/15" onClick={onEnd}>
              <LogOut className="h-4 w-4" />
              End room
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interviewer prompt</CardTitle>
            <p className="text-sm text-muted-foreground">Use this while answering on camera.</p>
          </CardHeader>
          <CardContent>
            <p className="font-medium leading-7">{prompt?.question}</p>
            <div className="mt-4 space-y-2">
              {prompt?.hints?.map((hint) => (
                <div key={hint} className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">{hint}</div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Room checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Keep your answer structured: clarify, solve, trade off, summarize.</p>
            <p>Use the timer to practice concise delivery.</p>
            <p>After ending, save a session and analyze feedback from notes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function InterviewPage() {
  const { user } = useAuthSession()
  const { toast } = useToast()
  const activeRoom = useInterviewStore((state) => state.activeRoom)
  const startRoom = useInterviewStore((state) => state.startRoom)
  const endRoom = useInterviewStore((state) => state.endRoom)
  const addSession = useInterviewStore((state) => state.addSession)
  const [roomId, setRoomId] = useState(() => createRoomId())

  function handleStart(nextRoomId = roomId) {
    startRoom({ id: nextRoomId, createdBy: user?.id, provider: serviceConfig.stream.enabled ? 'stream' : 'mock' })
    toast({
      title: serviceConfig.stream.enabled ? 'Stream room created' : 'Mock room created',
      description: serviceConfig.stream.enabled ? 'Joining with Stream Video SDK.' : 'Camera and mic run locally in the browser.',
      variant: 'success',
    })
  }

  function handleEnd() {
    addSession({
      title: 'Live mock interview',
      duration: '25 min',
      score: 84,
      category: 'Frontend',
      notes: 'Room ended. Add transcript notes in AI Feedback for a detailed report.',
    })
    endRoom()
  }

  function copyRoom() {
    navigator.clipboard?.writeText(activeRoom?.id || roomId)
    toast({ title: 'Room ID copied', description: activeRoom?.id || roomId, variant: 'success' })
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Video Mock Interview"
        title="Create or join an interview room"
        description="Stream Video SDK is ready when keys are configured. Without keys, the local browser mock room keeps the feature demonstrable."
      />

      {!activeRoom ? (
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Create room</CardTitle>
              <p className="text-sm text-muted-foreground">Start a private mock interview room with timer and controls.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomId">Room ID</Label>
                <Input id="roomId" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
              </div>
              <Button variant="premium" onClick={() => handleStart(roomId)}>
                <Play className="h-4 w-4" />
                Start mock room
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Video provider status</CardTitle>
              <p className="text-sm text-muted-foreground">Production Stream integration uses API key plus a secure token endpoint.</p>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">Current provider</p>
                <p className="mt-1 font-semibold">{serviceConfig.stream.enabled ? 'Stream Video SDK' : 'Local mock video'}</p>
              </div>
              <div className="rounded-md border p-4">
                <p className="text-sm text-muted-foreground">Camera controls</p>
                <p className="mt-1 font-semibold">Mic, video, timer</p>
              </div>
              <div className="rounded-md border p-4 sm:col-span-2">
                <p className="text-sm text-muted-foreground">Setup note</p>
                <p className="mt-1 text-sm">Add Stream keys in `.env` and provide a token endpoint for production-safe calls.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                <Video className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Active room: {activeRoom.id}</p>
                <p className="text-sm text-muted-foreground">{activeRoom.provider === 'stream' ? 'Stream call' : 'Local mock call'}</p>
              </div>
            </div>
            <Button variant="outline" onClick={copyRoom}>
              <Copy className="h-4 w-4" />
              Copy room ID
            </Button>
          </div>
          {serviceConfig.stream.enabled ? (
            <Suspense fallback={<Card><CardContent className="p-6 text-sm text-muted-foreground">Loading video room...</CardContent></Card>}>
              <StreamVideoRoom roomId={activeRoom.id} />
            </Suspense>
          ) : (
            <LocalMockRoom roomId={activeRoom.id} onEnd={handleEnd} />
          )}
        </>
      )}
    </div>
  )
}
