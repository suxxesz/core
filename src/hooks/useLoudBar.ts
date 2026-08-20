import { useState, useEffect  } from 'react'
import { ILoudBar } from '@/types/componets/loubar.types'

const useLoudBar = (song : HTMLAudioElement | null) => {
const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('volume')
    return saved ? Number(saved) : 100
  })
  const [muted, setMuted] = useState<boolean>(() => {
    return localStorage.getItem('isMuted') === 'true' ? true : false
  })
  const [prevVolume, setPrevVolume] = useState<number>(() => {
  const saved = localStorage.getItem('prevVolume')
  return saved ? Number(saved) : 100
})
  
  useEffect(() => {
    if (!song) return
    song.volume = muted ? 0 : volume / 100
  }, [volume, muted, song])

  useEffect(() => {
  if (!song) return

  const handleVolume = () => {
    setVolume(song.volume * 100)
    setMuted(song.volume === 0)
  }

  song.addEventListener('volumechange', handleVolume)
  
  return () => {
    song.removeEventListener('volumechange', handleVolume)
  }
  }, [song])


  const toggleMute = () => {
  setMuted((prev) => {
    const newMuted = !prev

    if (newMuted) {
      setPrevVolume(volume)
      setVolume(0)
    } else {
      setVolume(prevVolume || 100)
    }

    localStorage.setItem('isMuted', newMuted.toString())
    return newMuted
  })
}
  const handleVolumeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  const newVolume = Number(e.target.value)

  setVolume(newVolume)
  localStorage.setItem('volume', newVolume.toString())
  localStorage.setItem('prevVolume', newVolume.toString())

  if (newVolume > 0) {
    setMuted(false)
  }
}
return {
    handleVolumeChange , toggleMute , volume , muted , prevVolume
} as ILoudBar
}

export default useLoudBar