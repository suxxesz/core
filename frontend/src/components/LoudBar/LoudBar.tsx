import Button from '@/components/Button'
import Icon from '@/components/Icon'
import './LoudBar.scss'
import useLoudBar from '@/hooks/useLoudBar'
import { Volume2Icon, VolumeXIcon , Volume1  } from 'lucide-react' 
import { ILoudBar } from '@/types/componets/loubar.types'
import { useAtomValue } from 'jotai'
import { songAtom } from '@/store/store'

export default function LoudBar() {

  const song = useAtomValue(songAtom) 
                           
  const { handleVolumeChange , toggleMute , volume , muted  } : ILoudBar = useLoudBar(song)
  return (
    <div className="loud-bar">
      <div className="loud-bar__wrapper">
        <Button
          className="loud-bar__button"
          type="button"
          onClick={toggleMute}
        >
          <Icon
            Component={volume > 50 ? <Volume2Icon /> : volume === 0 ? <VolumeXIcon /> : <Volume1 />}
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