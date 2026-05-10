import { useCallback, useEffect, useMemo, useState } from 'react'

export function useMediaStream() {
  const [stream, setStream] = useState(null)
  const [error, setError] = useState('')
  const [isCameraOn, setCameraOn] = useState(true)
  const [isMicOn, setMicOn] = useState(true)

  const start = useCallback(async () => {
    setError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not supported in this browser.')
      return null
    }

    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(media)
      return media
    } catch (err) {
      setError(err.message || 'Camera permission was blocked.')
      return null
    }
  }, [])

  const stop = useCallback(() => {
    setStream((current) => {
      current?.getTracks().forEach((track) => track.stop())
      return null
    })
  }, [])

  const toggleCamera = useCallback(() => {
    setCameraOn((next) => {
      stream?.getVideoTracks().forEach((track) => {
        track.enabled = !next
      })
      return !next
    })
  }, [stream])

  const toggleMic = useCallback(() => {
    setMicOn((next) => {
      stream?.getAudioTracks().forEach((track) => {
        track.enabled = !next
      })
      return !next
    })
  }, [stream])

  useEffect(() => () => stop(), [stop])

  return useMemo(
    () => ({ stream, error, isCameraOn, isMicOn, start, stop, toggleCamera, toggleMic }),
    [error, isCameraOn, isMicOn, start, stop, stream, toggleCamera, toggleMic],
  )
}
