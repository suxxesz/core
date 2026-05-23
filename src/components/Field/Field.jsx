import clsx from 'clsx'
import './Field.scss'
import { useContext } from 'react'
import { FormContext } from '@/context/FormContext'

export default function Field({
  label,
  id,
  type = 'text',
  className,
  isTextPole = false,
  value,
  onChange,
  onBlur,
  errors = [],
  touched = false,
}) {
  const { countOfWords } = useContext(FormContext)

  const hasError   = touched && errors.length > 0
  const isSuccess  = touched && errors.length === 0 && value.trim().length > 0

  const inputClass = clsx(
    'field__input',
    isTextPole     && 'field__input--textarea',
    hasError       && 'field__input--error',
    isSuccess      && 'field__input--success',   
  )

  const sharedProps = {
    id,
    placeholder: ' ',
    value,
    onChange: (e) => onChange(e.target.value),
    onBlur,
    className: inputClass,
  }

  return (
    <div className={clsx(className, 'field', hasError && 'field--error', isSuccess && 'field--success')}>
      <label
        className={clsx('field__label', isTextPole && 'field__label--textarea')}
        htmlFor={id}
      >
        {label}
      </label>

      {isTextPole ? (
        <>
          <textarea {...sharedProps} />
          <span className="field__input--textarea--counter">{countOfWords}</span>
        </>
      ) : (
        <input {...sharedProps} type={type} />
      )}

      {hasError && (
        <span className="field__error">{errors.at(-1)}</span>
      )}
    </div>
  )
}