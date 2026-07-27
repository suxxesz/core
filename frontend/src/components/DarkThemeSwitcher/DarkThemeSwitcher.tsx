import React from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button'
import { clsx } from 'clsx'
import './DarkThemeSwitcher.scss'
import useDarkTheme from '@/hooks/useDarkTheme'
import { motion, AnimatePresence } from 'framer-motion'

import { LucideProps } from 'lucide-react'
import { Moon, Sun } from 'lucide-react'

export default function DarkThemeSwitcher() {
  const { 
    isDarkTheme, 
    toggleTheme,   
    isAnimating, 
    isClickBlocked, 
    coords, 
    completeAnimation 
  } = useDarkTheme()

  const CurrentIcon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> = isDarkTheme ? Moon : Sun

  return (
    <>
      {typeof window !== 'undefined' && createPortal(
        <div className="dark-theme-animation-container">
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                key={isDarkTheme ? 'dark-wave' : 'light-wave'}
                className={clsx(
                  'dark-theme-switcher-circle',
                  isDarkTheme ? 'dark-theme-switcher-circle-black' : 'dark-theme-switcher-circle-white'
                )}
                style={{
                  top: coords.y,
                  left: coords.x,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                onAnimationComplete={completeAnimation}
              />
            )}
          </AnimatePresence>
        </div>,
        document.body
      )}

      <Button
        className={clsx(
          'dark-theme-switcher',
          isClickBlocked && 'dark-theme-switcher--disabled'
        )}
        type="button"
        isDisabeled={isClickBlocked}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleTheme(e)}
      >
        <CurrentIcon
          className="icon-switcher"
          width={44}
          height={44}
        />
      </Button>
    </>
  )
}
