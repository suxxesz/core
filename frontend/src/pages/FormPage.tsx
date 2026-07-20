import Header from '@/layouts/Header'
import OverallForm from '@/layouts/OverallForm'
import FormProvider from '@/providers/FormProvider'
import ShootingStars from '@/components/ShootingStars'

const FormPage = () => {
  return (
    <div className="container">
      <div className="form-scene">
        <div className="form-scene__nebula form-scene__nebula--a" aria-hidden="true" />
        <div className="form-scene__nebula form-scene__nebula--b" aria-hidden="true" />
        <div className="form-scene__stars form-scene__stars--sm" aria-hidden="true" />
        <div className="form-scene__stars form-scene__stars--md" aria-hidden="true" />
        <ShootingStars />

        <Header isSongRequired={false} />

        <FormProvider>
          <OverallForm />
        </FormProvider>
      </div>
    </div>
  )
}

export default FormPage
