import Button from '@/components/Button'
import Field from '@/components/Field'
import Toast from '@/components/Toast'
import clsx from 'clsx'
import './OverallForm.scss'
import React, { useContext, useMemo } from 'react'
import { Variants } from 'framer-motion'
import { FormContext } from '@/context/FormContext'
import { createPortal } from 'react-dom'
import CountrySelect from '@/components/CountrySelect'
import { TFormContext } from '@/types/Form/formContext.types'
import { motion } from 'framer-motion'
import { User, Mail, MessageSquare, Loader2, Check } from 'lucide-react'
import { RULES } from '@/hooks/useForm'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
} as const satisfies Variants

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

  const requiredKeys = useMemo(
    () => (Object.keys(RULES) as Array<keyof typeof RULES>).filter((key) => RULES[key]?.required),
    [],
  )
  const completedCount = requiredKeys.filter((key) => fields[key].value.trim().length > 0 && fields[key].errors.length === 0).length

  const buttonLabel =
    submitStatus === 'success' ? (
      <span className="btn--submit__content"><Check size={18} /> Sent!</span>
    ) : submitStatus === 'loading' ? (
      <span className="btn--submit__content"><Loader2 size={18} className="btn--submit__spinner" /> Sending…</span>
    ) : (
      'Send message'
    )

  return (
    <>
    {createPortal(<Toast /> , document.body)}
      <form noValidate onSubmit={onSubmit} aria-label="Contact form">
        <motion.div
          className="form"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h1 className="form__title">Need to contact with me? Write here!</h1>
          <p className="form__progress" aria-live="polite">
            {completedCount === requiredKeys.length
              ? "All set — ready to send"
              : `${completedCount}/${requiredKeys.length} required fields completed`}
          </p>

          <motion.div
            className="form__wrapper"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="form__field form__field--icon">
              <User className="form__field-icon" size={16} aria-hidden="true" />
              <Field label="Your name" id="your-name" {...f('name')} />
            </motion.div>

            <motion.div variants={item} className="form__field form__field--icon">
              <User className="form__field-icon" size={16} aria-hidden="true" />
              <Field label="Your surname" id="your-subname" {...f('subname')} />
            </motion.div>

            <motion.div variants={item} className="form__field form__field--icon">
              <Mail className="form__field-icon" size={16} aria-hidden="true" />
              <Field label="Your email" id="your-email" {...f('email')} type="email" />
            </motion.div>

            <motion.div variants={item} className="form__field form__field--icon">
              <MessageSquare className="form__field-icon" size={16} aria-hidden="true" />
              <Field label="Topic" id="your-topic" {...f('topic')} isSelect />
            </motion.div>

            <motion.div variants={item} className="form__field form__field--full">
              <CountrySelect {...f('country')} />
            </motion.div>

            <motion.div variants={item} className="form__field form__field--full">
              <Field label="Write your message here..." id="your-message" {...f('message')} isTextPole />
            </motion.div>
          </motion.div>

          <Button
            className={clsx('btn--submit', {
              'is-loading': submitStatus === 'loading',
              'is-success': submitStatus === 'success',
              'disabled':   !isValid,
            })}
            type="submit"
            aria-disabled={!isValid}
          >
            {buttonLabel}
          </Button>
        </motion.div>
      </form>
    </>
  )
}
