import './Widget.scss'
import Icon from '@/components/Icon'
import Button from '@/components/Button'
import Subname from '@/components/Subname'
import { useContext } from 'react'
import { CopyContext } from '@/context/CopyContext'
import clsx from 'clsx'

export default function Widget() {
  const { src, name, id, href, time , status} = useContext(CopyContext)


  if (!name) return <div className="widget">Loading...</div>

  return (
    <div className="widget">
      <Icon src={src} className="widget__image" alt={name} size={70} />

      <div className={clsx("status" , status)}></div>

      <div className="widget__name--wrapper">
        <div className="widget__name">
          {name}
          <span className="widget__id">#{id}</span>
          <Subname />
        </div>

        <div className="widget__time">
          Last seen {time}
        </div>
      </div>

      <Button href={href} children="View" className="widget__link" />
    </div>
  )
}