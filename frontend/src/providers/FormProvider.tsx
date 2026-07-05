import React , { useMemo } from 'react'
import { FormContext } from '@/context/FormContext'
import useForm from '@/hooks/useForm'
import { TFormContext } from '@/types/Form/formContext.types'

export default function FormProvider({ children } : { children: React.ReactNode }) {
  const {
    fields,
    onChange,
    onBlur,
    onSubmit,
    isValid,
    submitStatus,
    countOfWords,
    toast,
    setToast,
  } : ReturnType<typeof useForm> = useForm()

  const value = useMemo(() => ({
    fields,
    onChange,
    onBlur,
    onSubmit,
    isValid,
    submitStatus,
    countOfWords,
    toast,
    setToast,
  }) as const, [
    fields,
    submitStatus,
    isValid,
    countOfWords,
    toast,
  ])

  return (
    <FormContext.Provider value={value as TFormContext}> 
      {children}
    </FormContext.Provider>
  )
}