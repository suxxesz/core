import { AudioContext } from '@/context/AudioContext'
import useAudio from '@/hooks/useAudio'
import { TAudio } from '@/types/audio.types'
import React , { useCallback } from 'react'

export default function AudioProvider({ children, audioData } : { children: React.ReactNode , audioData : TAudio }) {
 
const {
        isPaused,
        isStarted,
        image , 
        title ,
        play,
        pause,
        togglePlay,
        next,
        prev,
        preload , 
        preloadState , 
        iconSize
      } : ReturnType<typeof useAudio> = useAudio(audioData)
      const memoizedValue = useCallback(() => {
        return {
        isPaused,
        isStarted,
        image ,title ,
        play,
        pause,
        togglePlay,
        next,
        prev,
        preload , 
        preloadState , 
        iconSize
      } as const}, [isPaused, isStarted, image, title, play, pause, togglePlay, next, prev, preload, preloadState, iconSize])

  return (
    <AudioContext.Provider
      value={{...memoizedValue() as any}}
    > 
      {children}
    </AudioContext.Provider>
  )
}