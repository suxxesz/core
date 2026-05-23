import './AudioPlayer.scss'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { useEffect,  useState, useContext } from 'react'
import { AudioContext } from '@/context/AudioContext'
import formatTime from '@/utils/soundTime'


import { SkipForward , PauseIcon , Play } from 'lucide-react'

export default function AudioPlayer() {
  const {
    song,
    isPaused,
    togglePlay,
    next,
    prev,
    image,
    title,
    iconSize
  } = useContext(AudioContext)

  const [timecode, setTimecode] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [progress, setProgress] = useState(0)


  useEffect(() => {
  if (!song) return

  const update = () => {
    const current = song.currentTime
    const dur = song.duration || 0

    setTimecode(formatTime(current))
    setProgress(dur ? (current / dur) * 100 : 0)
  }

  const setMeta = () => {
    setDuration(formatTime(song.duration || 0))
  }

  song.addEventListener('timeupdate', update)
  song.addEventListener('loadedmetadata', setMeta)

  return () => {
    song.removeEventListener('timeupdate', update)
    song.removeEventListener('loadedmetadata', setMeta)
  }
}, [song])

  useEffect(() => {
    setTimecode('0:00')
    setProgress(0)
  }, [song])

  const onNext = () => {
    next()
  }

  const onPrev = () => {
    prev()
  }

  return (
    <div className='audio__player'>

      <Icon
        src={image}
        size={70}
        className='audio__player--preview'
      />

      <div className="audio__player--timer-wrapper">
        <h2 className="audio__player--title">{title}</h2>

        <div className="audio__player--scale-wrapper">

          <div className="audio__player--time-primary">
            {timecode}
          </div>

          <div className="audio__player--scale">
            <div
              className="audio__player--scale-progress"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="audio__player--time-secondary">
            {duration}
          </div>

        </div>
      </div>

      <div className="audio__player--functional">

        <Button className='audio__player--next' type="button" onClick={onPrev} 
          style={{ 
            transform: 'rotate(180deg)' , 
          position: 
          'relative' , 
          bottom: '4px' }}>
          <Icon
            className='audio__player--next-icon icon-switcher'
            ariaLabel="back"
            Component={SkipForward}
            size={iconSize}
          />
        </Button>

        <Button
          className='audio__player--pause'
          type="button"
          onClick={togglePlay}
        >
          <Icon
            className='audio__player--pause-icon icon-switcher'
            ariaLabel="pause"
            Component={isPaused ? Play : PauseIcon}
          />
        </Button>

        <Button className='audio__player--next' type="button" onClick={onNext}>
          <Icon
            className='audio__player--next-icon icon-switcher'
            ariaLabel="next"
            Component={SkipForward}
            size={iconSize}
          />
        </Button>

      </div>
    </div>
  ) 
}