import './AudioPopup.scss'
import React  , { useContext } from 'react'
import { AudioContext } from '@/context/AudioContext'
import clsx from 'clsx'


export default function AudioPopup() {
  const audioContext = useContext(AudioContext)
  const { preload, preloadState } = audioContext ?? {}

  return (
    <div className={preloadState ? clsx('audio-popup', 'hide') : clsx('audio-popup', 'show-popup')} onClick={preload}>
      <div className="audio-popup__content">
        <p>Click to enter</p>
      </div>
    </div>
  )
}