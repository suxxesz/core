import React from 'react'
import Header from '@/layouts/Header'
import OverallForm from '@/layouts/OverallForm'
import FormProvider from '@/providers/FormProvider'

const FormPage = () => {
  return (
    <div className='container'>
        <Header isSongRequired={false} />
    <FormProvider>
        <OverallForm/>
    </FormProvider>
    </div>
    )
}

export default FormPage