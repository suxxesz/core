import { isDarkThemeAtom } from '@/store/store'
import { useAtom } from 'jotai'
import { useCallback, useState, useEffect } from 'react'

const useDarkTheme = () => {
  const [isDarkTheme, setTheme] = useAtom(isDarkThemeAtom)
  
  const [isAnimating, setIsAnimating] = useState(false)
  const [isClickBlocked, setIsClickBlocked] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    document.documentElement.classList.toggle('is-dark-theme', isDarkTheme)
  }, [isDarkTheme])

  const completeAnimation = useCallback(() => {
    setIsAnimating(false)
  }, [])

  const toggleTheme = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (isClickBlocked) return

    setIsClickBlocked(true)
    setIsAnimating(true)

    if (e && 'clientX' in e) {
      setCoords({ x: e.clientX, y: e.clientY })
    }

    setTheme(prev => {
      const newTheme = !prev
      localStorage.setItem('theme', newTheme ? 'dark-theme' : 'light-theme')
      return newTheme
    })

    setTimeout(() => {
      setIsClickBlocked(false)
    }, 1700)
  }, [isClickBlocked, setTheme])

  return {
    isDarkTheme,
    toggleTheme,
    isAnimating,
    isClickBlocked,
    coords,
    completeAnimation
  }
}

export default useDarkTheme
