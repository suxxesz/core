import { useState, useRef } from 'react'

const useCopy = ()  => {
    const [isCopied, setIsCopied] = useState<boolean>(false)
  const [countOfCopy, setCountOfCopy] = useState<number>(0)
  const [copyInner, setCopyInner] = useState<string>('Copy?')

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateCopyState : (count: number) => void = (count) => {
    switch (true) {
      case count >= 13:
        setCopyInner('HOLLYY SHIIIIIIIIT!!!')
        break
      case count === 12:
        setCopyInner('LIDICROUS KILL!!!!!!')
        break
      case count === 11:
        setCopyInner('GODLIKE!!!! ')
        break
      case count === 10:
        setCopyInner('RAMPAGE!!!!!!')
        break
      case count === 9:
        setCopyInner('Wicked Sick ')
        break
      case count === 8:
        setCopyInner('Mega-kill')
        break
      case count === 7:
        setCopyInner('Dominating ')
        break
      case count === 6:
        setCopyInner('Triple kill')
        break
      case count === 5:
        setCopyInner('Killing spree')
        break
      case count === 4:
        setCopyInner('Double kill!')
        break
      case count >= 1:
        setCopyInner(`Copied x${count}!`)
        break
      default:
        break
    }
  }

  const copyOnClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)

      setIsCopied(true)

      setCountOfCopy((prev) => {
        const newCount = prev + 1
        updateCopyState(newCount)
        return newCount
      })
    } catch (err) {
      console.error('Ошибка копирования: ', err)
    }
  }

  const onMouseLeaveCopyState = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setCopyInner('Copy?')
      setCountOfCopy(0)
      setIsCopied(false)
    }, 2000)
  }
  return {
    isCopied,
        countOfCopy,
        copyInner,
        copyOnClipboard,
        onMouseLeaveCopyState,
  }
}

export default  useCopy 