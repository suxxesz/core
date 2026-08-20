import React from 'react'
import Button from '@/components/Button'
import './Main.scss'
import Widget from '@/sections/Widget'
import Icon from '@/components/Icon';
import AudioPlayer from '@/sections/AudioPlayer';
import CopyProvider from '@/providers/CopyProvider'
import {links} from '@/lib/mainLinks'

export default (props : {
  children : React.ReactNode , 
  subtitle : string
}) => {
  const { children , subtitle } = props

  return (
    <main className='main'>
    <div className='main'>
      <h1 className='main__title'>{children}</h1>
      <div>
        <p 
        className='main__subtitle'
        > 
          {subtitle}
        </p>
        </div>
      <CopyProvider>
          <Widget />
      </CopyProvider>
      <ul className='main__links--list'>
        {links.map((link, index) => (
          <li key={index} className='main__links--item'>
            <Button className="main__link" href={link.href} title={link.name} target="_blank">
              <Icon Component={link.icon} className="main__link-icon"  size={44}></Icon>
            </Button>
          </li>
        ))}
      </ul>
      <AudioPlayer />
    </div>
    </main>
  )
}