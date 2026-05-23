import { useMemo } from 'react'
import { FormContext } from '@/context/FormContext'
import useForm from '@/hooks/useForm'

export default function FormProvider({ children }) {
  const form = useForm()

  const value = useMemo(() => form, [
    form.fields,
    form.submitStatus,
    form.isValid,
    form.countOfWords,
  ])

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}