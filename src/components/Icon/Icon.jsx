import './Icon.scss'
import clsx from 'clsx'

export default function Icon({
  className,
  Component,   
  src,         
  alt = '',
  size = 24,
  color = 'currentColor',
  ariaLabel,
  onClick,
  ...props
}) {
  const isClickable = typeof onClick === 'function'

  if (!Component && !src) return null

  return (
    <span
      className={clsx('icon', className, {
        'icon--clickable': isClickable,
      })}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size, color ,}}
      {...props}
    >
      {Component ? (
        <Component className={className} />
      ) : (
        <img src={src} alt={alt || ariaLabel || ''} className={className}/>
      )}
    </span>
  )
}