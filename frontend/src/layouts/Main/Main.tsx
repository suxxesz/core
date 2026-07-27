import React from 'react'
import Button from '@/components/Button'
import './Main.scss'
import Widget from '@/sections/Widget'
import Icon from '@/components/Icon';
import AudioPlayer from '@/sections/AudioPlayer';
import CopyProvider from '@/providers/CopyProvider'
<<<<<<< HEAD
import {MailCheck , GitGraph , Send} from 'lucide-react'
import {LucideProps} from 'lucide-react'
=======
import {links} from '@/lib/mainLinks'
>>>>>>> 3f27d723ea07d02218001e33192d80620e63fbf0

export default (props : {
  children : React.ReactNode , 
  subtitle : string
}) => {
  const { children , subtitle } = props

<<<<<<< HEAD
  interface ILinks {
    name : string , 
    href : string , 
    icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>
  }

  const links : ILinks[] = [
    { name: 'Telegramm', href: 'https://t.me/AE86TRUENO4AGE112HPRWD' , icon: Send },
    { name: 'GitHub', href: 'https://github.com/suxxesz' , icon: GitGraph },
    { name: 'Freelance', href: 'https://www.upwork.com/freelancers/~014d53cdeff21d99d6' , icon: MailCheck } , 
  ] 
=======
>>>>>>> 3f27d723ea07d02218001e33192d80620e63fbf0
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
            <Button className="main__link" href={link.href} aria-title={link.name} aria-target="_blank">
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