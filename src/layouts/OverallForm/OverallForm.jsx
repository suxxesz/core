import Button from '@/components/Button'
import Field from '@/components/Field'
import clsx from 'clsx'
import './OverallForm.scss'
import { useContext } from 'react'
import {FormContext} from '@/context/FormContext'

export default function OverallForm() {
  const { fields, onChange, onBlur, onSubmit, isValid,    messageInputValue ,  submitStatus  } = useContext(FormContext)

  const f = (name) => ({
    value:    fields[name].value,
    errors:   fields[name].errors,
    touched:  fields[name].touched,
    onChange: (val) => onChange(name, val),
    onBlur:   () => onBlur(name),
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className='form'>
        <h1 className='form__title'>Need to contact with me? Write here!</h1>

        <div className="form__wrapper">
          <Field label="Your name"                    id="your-name"    {...f('name')} />
          <Field label="Your surname"                 id="your-subname" {...f('subname')} />
          <Field label="Your email"                   id="your-email"   {...f('email')} type="email" />
          <Field label="Your country (not required)"  id="your-country" {...f('country')} />
          <Field label="Write your message here..."   id="your-message" {...f('message')} isTextPole ref={messageInputValue} />
        </div>

        {submitStatus === 'error' && (
          <p className="form__error">Something went wrong, please try again.</p>
        )}

        <Button
          className={clsx('form__submit-button', 'btn--submit', {
            'is-loading': submitStatus === 'loading',
            'is-success': submitStatus === 'success',
            'disabled': isValid === false
          })}
          type="submit"
          disabled={submitStatus === 'loading' || submitStatus === 'success'}
        >
          {submitStatus === 'success' ? 'Sent ✓' : submitStatus === 'loading' ? '' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}