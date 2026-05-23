
import './Button.scss'
import clsx from 'clsx'


export default (props ) => {
  const { className, type = 'button', href, children , unussual = false , onClick ,  isDisabeled ,  ...rest  } = props

  const isLink  = href !== undefined
  const Component = isLink ? 'a' : 'button'
  const linkAttributes  = { href }
  const buttonAttributes  = { type }
  const attributesByTag  = isLink ? linkAttributes : buttonAttributes

  return (
    <Component className={ unussual ? className : clsx('button', className) } {...attributesByTag} {...props} {...rest} onClick={onClick} disabled={isDisabeled} >
      {children}
    </Component>
  )
}
 