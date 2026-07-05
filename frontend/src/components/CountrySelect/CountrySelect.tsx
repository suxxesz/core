import ReactSelect from 'react-select'
import countryList from 'country-list'
import './CountrySelect.scss'
import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { CountryProps } from '@/types/componets/country.types'

const options = countryList.getData().map(({ code, name }) => ({
  value: code as string,
  label: name as string,
}))

export default function CountrySelect(
  { value, onChange, onBlur, errors, touched } : CountryProps
) {
  const [isFocused, setIsFocused] = useState(false)

  const selected = useMemo(
    () => options.find(o => o.value === value) ?? null,
    [value]
  )

  const hasError = Boolean(
    touched && errors && (
      (Array.isArray(errors) && errors.length > 0) || (typeof errors === 'string' && errors.length > 0)
    )
  )
  const isSuccess = Boolean(touched && !hasError && !!value)

  const isLabelActive = isFocused || !!selected

  return (
    <div className={clsx('field', {
      'field--error':   hasError,
      'field--success': isSuccess,
    })}>
      <label className={clsx('field__label', { 'field__label--active': isLabelActive })}>
        Your country
      </label>

      <ReactSelect
        options={options}
        value={selected}
        onChange={(option) => onChange?.({ target: { value: option?.value ?? '' } } as unknown as React.ChangeEvent<HTMLInputElement>)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        isClearable
        placeholder=''
        classNamePrefix="country-select"
      />

      {hasError && (
        <span className="field__error">
          {Array.isArray(errors) ? errors[0] : String(errors)}
        </span>
      )}
    </div>
  )
}
