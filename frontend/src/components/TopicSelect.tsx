import ReactSelect from 'react-select'
import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { TOPICS } from '@/hooks/useForm'
import { TopicProps } from '@/types/componets/topic.types'

const options = TOPICS.map(({ value, label }) => ({ value, label }))

export default function TopicSelect({
  value,
  onChange,
  onBlur,
  errors,
  touched,
  icon,
}: TopicProps & { icon?: React.ReactNode }) {
  const [isFocused, setIsFocused] = useState(false)

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [value])

  const hasError = Boolean(
    touched &&
      errors &&
      ((Array.isArray(errors) && errors.length > 0) ||
        (typeof errors === 'string' && errors.length > 0))
  )
  const isSuccess = Boolean(touched && !hasError && !!value)

  const isLabelActive = isFocused || !!selected

  return (
    <div
      className={clsx('field', {
        'field--error': hasError,
        'field--success': isSuccess,
      })}
    >
      <label className={clsx('field__label', { 'field__label--active': isLabelActive })}>
        {icon && <span className="field__label-icon">{icon}</span>}
        Topic
      </label>

      <ReactSelect
        options={options}
        value={selected}
        onChange={(option) =>
          onChange?.({
            target: { value: option?.value ?? '' },
          } as unknown as React.ChangeEvent<HTMLInputElement>)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        isSearchable={false}
        placeholder=""
        classNamePrefix="country-select"
        // Вырезаем встроенные иконки и разделители react-select:
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
      />

      {hasError && (
        <span className="field__error">
          {Array.isArray(errors) ? errors[0] : String(errors)}
        </span>
      )}
    </div>
  )
}