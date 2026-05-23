import { useEffect, useRef, useState } from 'react'

const useAudio = (audioData) => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [song, setSong] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [preloadState, setPreloadState] = useState(false)

  const audioRef = useRef(null)
  const iconSize =  16

  const play = () => {
    if (!audioRef.current) return
    audioRef.current.play().catch(() => {})
    setIsPaused(false)
  }

  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPaused(true)
  }

  const togglePlay = () => {
    isPaused ? play() : pause()
  }

  const next = () => {
    setIndex((i) => (i + 1) % audioData.length)
    setIsPaused(false)
    setIsStarted(true)
  }

  const prev = () => {
    setIndex((i) => (i === 0 ? audioData.length - 1 : i - 1))
    setIsPaused(false)
    setIsStarted(true)
  }

  const preload = () => {
    setIsPaused(false)
    setIsStarted(true)
    setPreloadState(prev => !prev)
  }

  useEffect(() => {
    if (!audioData?.length) return

    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(audioData[index].src)
    audioRef.current = audio
    setSong(audio)

    const onPlay = () => setIsPaused(false)
    const onPause = () => setIsPaused(true)
    const onEnded = () => next()

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    if (isStarted) {
      audio.play().catch(() => {})
    }

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [index, isStarted, audioData])

  return {
    song,
    isPaused,
    isStarted,
    image: audioData[index]?.image,
    title: audioData[index]?.title,
    play,
    pause,
    togglePlay,
    next,
    prev,
    preload,
    preloadState,
    iconSize
  }
}

export default useAudio