import { useState, useCallback, useMemo } from "react"
import pushData from '@/api/data/pushData'

const RULES = {
  name:    { min: 2,  max: 30,   required: true },
  subname: { min: 2,  max: 30,   required: true },
  email:   { min: 5,  max: 50,   required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMessage: 'Invalid email format' },
  country: { min: 2,  max: 50,   required: false },
  message: { min: 10, max: 5000, required: true },
}

export { RULES }

const validateField = (value, rules) => {
  const errors = []
  if (rules.required && !value.trim()) {
    errors.push('This field is required')
    return errors
  }
  if (value && value.length < rules.min) errors.push(`At least ${rules.min} characters`)
  if (value && value.length > rules.max) errors.push(`Max ${rules.max} characters`)
  if (value && rules.pattern && !rules.pattern.test(value)) errors.push(rules.patternMessage || 'Invalid format')
  return errors
}

const INITIAL_FIELDS = {
  name:    { value: '', errors: [], touched: false },
  subname: { value: '', errors: [], touched: false },
  email:   { value: '', errors: [], touched: false },
  country: { value: '', errors: [], touched: false },
  message: { value: '', errors: [], touched: false },
}

const useForm = () => {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [submitStatus, setSubmitStatus] = useState('idle')

  const onChange = useCallback((fieldName, value) => {
    const errors = validateField(value, RULES[fieldName])
    setFields(prev => ({ ...prev, [fieldName]: { ...prev[fieldName], value, errors } }))
  }, [])

  const onBlur = useCallback((fieldName) => {
    setFields(prev => ({ ...prev, [fieldName]: { ...prev[fieldName], touched: true } }))
  }, [])

  const isValid = useMemo(() =>
    Object.entries(RULES).every(([key, rules]) => {
      if (!rules.required) return true
      const field = fields[key]
      return field.value.trim() && field.errors.length === 0
    }),
  [fields])

  const countOfWords = useMemo(() =>
    `${fields.message.value.length}/${RULES.message.max}`,
  [fields.message.value])

  const onSubmit = useCallback(async (e) => {
    e.preventDefault()

    setFields(prev => {
      const next = { ...prev }
      Object.keys(next).forEach(key => { next[key] = { ...next[key], touched: true } })
      return next
    })

    if (!isValid) return
    setSubmitStatus('loading')

    try {
      await pushData({
        name:    fields.name.value,
        subname: fields.subname.value,
        email:   fields.email.value,
        country: fields.country.value,
        message: fields.message.value,
      })
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }, [fields, isValid])

  return { fields, onChange, onBlur, onSubmit, isValid, submitStatus, countOfWords }
}

export default useForm