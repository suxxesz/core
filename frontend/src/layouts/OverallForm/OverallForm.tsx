import Button from '@/components/Button'
import Field from '@/components/Field'
import Toast from '@/components/Toast'
import clsx from 'clsx'
import './OverallForm.scss'
import React , { useContext } from 'react'
import { FormContext } from '@/context/FormContext'
import { createPortal } from 'react-dom'
import CountrySelect from '@/components/CountrySelect'
import { TFormContext } from '@/types/Form/formContext.types'

export default function OverallForm() {
  const context = useContext(FormContext)
  if (!context) throw new Error('OverallForm must be used within a FormContext.Provider')
  const { fields, onChange, onBlur, onSubmit, isValid, submitStatus } : TFormContext = context

  const f = (name : string, isSelect?: boolean) : { value: string, errors: Array<string>, touched: boolean, onChange: (val: string | React.ChangeEvent<HTMLInputElement>) => void, onBlur: () => void } => ({
    value:   fields[name].value,
    errors:  fields[name].errors ,
    touched: fields[name].touched,
    onChange: (val) => onChange(name, typeof val === 'string' ? val : val.target.value),
    onBlur:   () => onBlur(name),
  })

  return (
    <>
    {createPortal(<Toast /> , document.body)}
      <form noValidate onSubmit={onSubmit} aria-label="Contact form">
        <div className="form">
          <h1 className="form__title">Need to contact with me? Write here!</h1>

          <div className="form__wrapper">
            <Field label="Your name"                   id="your-name"    {...f('name')} />
            <Field label="Your surname"                id="your-subname" {...f('subname')} />
            <Field label="Your email"                  id="your-email"   {...f('email')} type="email" />
            <Field label="Topic"                       id="your-topic"   {...f('topic')} isSelect />
            <CountrySelect {...f('country')} />
            <Field label="Write your message here..."  id="your-message" {...f('message')} isTextPole />
          </div>

          <Button
            className={clsx('btn--submit', {
              'is-loading': submitStatus === 'loading',
              'is-success': submitStatus === 'success',
              'disabled':   !isValid,
            })}
            type="submit"
            aria-disabled={!isValid}
          >
            {submitStatus === 'success' ? 'Sent !' : submitStatus === 'loading' ? '' : 'Send message'}
          </Button>
        </div>
      </form>
    </>
  )
}