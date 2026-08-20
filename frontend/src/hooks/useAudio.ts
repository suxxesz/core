import { useEffect, useRef, useState } from 'react'
import { TAudioData } from '@/types/audio.types'
import { useAtom } from 'jotai'
import { songAtom } from '@/store/store'
import { iconSizeAtom } from '@/store/store'

const useAudio = (audioData : Array<TAudioData>) => {
  const [index, setIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(true)
  const [song, setSong] = useAtom(songAtom)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [preloadState, setPreloadState] = useState<boolean>(false)
  const [iconSize , setIconSize] = useAtom(iconSizeAtom)

  const audioRef = useRef<HTMLAudioElement>(null)


  const play = () : void => {
    if (!audioRef.current) return
    audioRef.current.play().catch(() => {})
    setIsPaused(false)
  }
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth === 500) {
      setIconSize(prev => prev = 16)
    }
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
  }, [])

  const pause = () : void => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPaused(true)
  }

  const togglePlay = () => {
    isPaused ? play() : pause()
  }

  const next = () : void => {
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
    audioRef.current = audio as HTMLAudioElement
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