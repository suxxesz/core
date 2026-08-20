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


const selectStyles = {
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
}

const selectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null
}

function CountrySelect({
  value,
  onChange,
  onBlur,
  errors,
  touched,
  icon,
}: CountryProps & { icon?: React.ReactNode }) {
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
        Your country
      </label>

      <ReactSelect
        options={options}
        instanceId={"country-select-instance"}
        value={selected}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={selectStyles}
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
        isClearable
        placeholder=""
        classNamePrefix="country-select"
        components={selectComponents}
      />

      {hasError && (
        <span className="field__error">
          {Array.isArray(errors) ? errors[0] : String(errors)}
        </span>
      )}
    </div>
  )
}
export default React.memo(CountrySelect)