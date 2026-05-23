import Button from '@/components/Button'
import './Main.scss'
import Widget from '@/sections/Widget'
import Icon from '@/components/Icon';
import AudioPlayer from '@/sections/AudioPlayer';
import CopyProvider from '@/providers/CopyProvider'

import {MailCheck , GitGraph , Send} from 'lucide-react'

export default (props) => {
  const { children , subtitle } = props


  const links = [
    { name: 'Telegramm', href: 'https://t.me/AE86TRUENO4AGE112HPRWD' , icon: Send },
    { name: 'GitHub', href: 'https://github.com/suxxesz' , icon: GitGraph },
    { name: 'Freelance', href: 'https://www.upwork.com/freelancers/~014d53cdeff21d99d6' , icon: MailCheck } , 
  ] 
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