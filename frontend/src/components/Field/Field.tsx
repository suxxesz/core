import clsx from 'clsx'
import React, { useContext } from 'react'
import './Field.scss'
import { FormContext } from '@/context/FormContext'
import { TOPICS } from '@/hooks/useForm'
import { IFieldProps } from '@/types/Form/field.types'
import { TFormContext } from '@/types/Form/formContext.types'

// Если IFieldProps находится в другом файле, добавь туда: icon?: React.ReactNode
export default function Field({
  label,
  id,
  type = 'text',
  className,
  isTextPole = false,
  isSelect = false,
  value,
  onChange,
  onBlur,
  errors = [],
  touched = false,
  icon, // <-- Добавляем иконку в пропсы
}: IFieldProps & { icon?: React.ReactNode }) {
  const { countOfWords } = useContext(FormContext) as Pick<TFormContext, 'countOfWords'>

  const hasError  = touched && errors.length > 0
  const isSuccess = touched && errors.length === 0 && value.trim().length > 0
  const errorId   = `${id}-error`
  const ariaInvalid = hasError ? ('true' as const) : undefined
  const ariaDescribedBy = hasError ? errorId : undefined

  const sharedProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(e.target.value),
    onBlur,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    className: clsx(
      'field__input',
      isTextPole && 'field__input--textarea',
      hasError && 'field__input--error',
      isSuccess && 'field__input--success',
    ),
  }

  return (
    <div className={clsx(className, 'field', hasError && 'field--error', isSuccess && 'field--success')}>
      <label
        className={clsx('field__label', isTextPole && 'field__label--textarea')}
        htmlFor={id}
      >
        {/* Рендерим иконку прямо внутри лейбла, если она передана */}
        {icon && <span className="field__label-icon">{icon}</span>}
        {label}
      </label>

      {isSelect ? (
        <select {...sharedProps} className={clsx(sharedProps.className, 'field__select')}>
          <option value={TOPICS[0].value} disabled hidden className='country-select--option'/>
          {TOPICS.map(t => (
            <option key={t.value} className='country-select--option' value={t.value}>{t.label}</option>
          ))}
        </select>
      ) : isTextPole ? (
        <>
          <textarea {...sharedProps} placeholder=" " />
          <span className="field__input--textarea--counter" aria-hidden="true">
            {countOfWords}
          </span>
        </>
      ) : (
        <input {...sharedProps} type={type} placeholder=" " />
      )}

      {hasError && (
        <span id={errorId} role="alert" aria-live="polite" className="field__error">
          {errors.at(-1)}
        </span>
      )}
    </div>
  )
}