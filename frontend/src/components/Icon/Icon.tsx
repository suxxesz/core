import React from 'react'
import './Icon.scss'
import clsx from 'clsx'
import { IconProps } from '@/types/componets/icon.types'

type IconComponentProps = Partial<IconProps>

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
}: IconComponentProps) {
  
  const isClickable = typeof onClick === 'function'

  if (!Component && !src) return null

  return (
    <span
      className={clsx('icon', {
        'icon--clickable': isClickable,
      }, className)}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ 
        width: size, 
        height: size, 
        minWidth: size,
        minHeight: size,
        color 
      }}
      {...props}
    >
      {Component ? (
        (() => {
          if (React.isValidElement(Component)) {
            return React.cloneElement(Component as React.ReactElement<any>, { 
              className: clsx((Component.props as any)?.className, className),
              size: size,
              color: color
            })
          }
          
          const TargetIcon = Component as React.ComponentType<any>
          return <TargetIcon className={className} size={size} color={color} />
        })()
      ) : (
        <img src={src} alt={alt || ariaLabel || ''} className={className} />
      )}
    </span>
  )
}
