import Main from '@/layouts/Main'
import Header from '@/layouts/Header'
import AudioPopup from '@/layouts/AudioPopup'
import song1 from '@/assets/sounds/song1.mp3'
import song1Image from '@/assets/sounds/song1.jpg'
import song2 from '@/assets/sounds/song2.mp3'
import song2Image from '@/assets/sounds/song2.jpg'
import song3 from '@/assets/sounds/song3.mp3'
import song3Image from '@/assets/sounds/song3.jpg'
import song4 from '@/assets/sounds/song4.mp3'
import song4Image from '@/assets/sounds/song4.jpg'
import song5 from '@/assets/sounds/song5.mp3'
import song5Image from '@/assets/sounds/song5.jpg'
import AudioProvider from '@/providers/AudioProvider'
import OverlayProvider from "@/providers/OverlayProvider"
import Overlay from '@/components/Overlay'
import  Button  from '@/components/Button'

const audioData = [
  {
      src: song2,
        image : song2Image,
        title: 'platina - santa klaus',
        end: '2:40'
    } ,
    {
        src: song1 , 
        image : song1Image,
        title: 'sleep',
        end: '1:40'
    },
    {
      src: song3,
        image : song3Image,
        title: 'LONOWN, riserayss - worry ',
        end: '2:40'
    } ,
    {
      src: song4,
        image : song4Image,
        title: 'Cult Member - Midnight in Hel (djpwndu remix)',
        end: '2:40'
    } ,
    {
      src: song5,
        image : song5Image,
        title: 'dj pwndu - phonkeveryday',
        end: '2:40'
    } ,

  ]

const MainPage = () => {
    return(
    <AudioProvider
      audioData={audioData}
      
    >
      <AudioPopup/>
      <Header client:load isSongRequired={true} />
      <Main client:load children='SUXXESZ' subtitle={`Web developer | UI/UX Designer`} />
      <AudioPopup/>
      <OverlayProvider>
        <Overlay>
         <Button href="/form" className='link'>Write message here...</Button>
        </Overlay>
      </OverlayProvider>
    </AudioProvider>
    )
}

export default MainPage