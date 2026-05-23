import { AudioContext } from '@/context/AudioContext'
import useAudio from '@/hooks/useAudio'
import { useCallback } from 'react'

export default function AudioProvider({ children, audioData }) {
 
const {song,
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
      } = useAudio(audioData)
      const memoizedValue = useCallback(() => {
        return {
        song,
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
      }}, [song, isPaused, isStarted, image, title, play, pause, togglePlay, next, prev, preload, preloadState, iconSize])

  return (
    <AudioContext.Provider
      value={{...memoizedValue()}}
    >
      {children}
    </AudioContext.Provider>
  )
}