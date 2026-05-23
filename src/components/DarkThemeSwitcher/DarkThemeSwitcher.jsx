import Icon from '@/components/Icon'
import Button from '../Button'
import clsx from 'clsx'
import './DarkThemeSwitcher.scss'
import useDarkTheme from '@/hooks/useDarkTheme'

import { Moon , Sun } from 'lucide-react'

export default function DarkThemeSwitcher() {

  const {isDarkTheme , toggleTheme} = useDarkTheme()

  return (
    <>
      <Button
        className={clsx('dark-theme-switcher')}
        type="button"
        onClick={toggleTheme}
      >
        <Icon
          Component={isDarkTheme ? Moon : Sun}
          className="icon-switcher"
          size={35}
          aria-label="theme icon"
        />
      </Button>

    </>
  )
}