import React , { useContext, useEffect, useRef, useState } from 'react'
import { FormContext } from '@/context/FormContext'
import clsx from 'clsx'
import './Toast.scss'
import { X } from 'lucide-react'
import Button from '../Button'

const TOAST_DURATION = 4000

export default function Toast() {
  const { toast, setToast } : any  = useContext(FormContext)

  const [closing, setClosing] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const close = () => {
    setClosing(true)
  }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(close, TOAST_DURATION)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    if (toast) {
      setClosing(false)
      ref.current?.focus()
    }
  }, [toast])

  useEffect(() => {
    if (!closing) return
    const t = setTimeout(() => setToast(null), 300)
    return () => clearTimeout(t)
  }, [closing])

  if (!toast) return null

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      tabIndex={-1}
      className={clsx('toast', `toast--${toast.type}`, { 'toast--closing': closing })}
    >
      <span className="toast__text">{toast.text}</span>
      <Button
        className="toast__close"
        aria-label="Close notification"
        onClick={close}
      >
        <X className="toast__close-icon" />
      </Button>
      <div className="toast__timer" />
    </div>
  )
}