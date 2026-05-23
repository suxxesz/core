import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { AudioContext } from '@/context/AudioContext'
import { useContext} from 'react'
import './LoudBar.scss'
import useLoudBar from '@/hooks/useLoudBar'
import { Volume2Icon, VolumeXIcon , Volume1  } from 'lucide-react'
export default function LoudBar() {

  const { song } = useContext(AudioContext) 

  const { handleVolumeChange , toggleMute , volume , muted  } = useLoudBar(song)
  return (
    <div className="loud-bar">
      <div className="loud-bar__wrapper">
        <Button
          className="loud-bar__button"
          type="button"
          onClick={toggleMute}
        >
          <Icon
            Component={volume > 50 ? Volume2Icon : volume === 0 ?  VolumeXIcon : Volume1 }
            className="loud-bar__icon icon-switcher"
            size={24}
          />
        </Button>

        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : volume}
          className="loud-bar__slider"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}