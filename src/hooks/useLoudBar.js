import { useState, useEffect  } from 'react'

const useLoudBar = (song) => {
const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('volume')
    return saved ? Number(saved) : 100
  })
  const [muted, setMuted] = useState(() => {
    return localStorage.getItem('isMuted') === 'true' ? true : false
  })
  const [prevVolume, setPrevVolume] = useState(() => {
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

    localStorage.setItem('isMuted', newMuted)
    return newMuted
  })
}
  const handleVolumeChange = (e) => {
  const newVolume = Number(e.target.value)

  setVolume(newVolume)
  localStorage.setItem('volume', newVolume)
  localStorage.setItem('prevVolume', newVolume)

  if (newVolume > 0) {
    setMuted(false)
  }
}
return {
    handleVolumeChange , toggleMute , volume , muted , prevVolume
}
}

export default useLoudBar