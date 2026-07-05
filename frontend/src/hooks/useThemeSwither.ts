import { useCallback, useState, useEffect } from 'react'

const useThemeSwitcher = () => {
const [isDarkTheme, setTheme] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark-theme'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('is-dark-theme', isDarkTheme)
  }, [isDarkTheme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = !prev

      localStorage.setItem(
        'theme',
        newTheme ? 'dark-theme' : 'light-theme'
      )

      return newTheme
    })
  }, [])
  return {isDarkTheme , toggleTheme}
}

export default useThemeSwitcher