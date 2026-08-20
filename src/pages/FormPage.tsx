import Header from '@/layouts/Header'
import OverallForm from '@/layouts/OverallForm'
import FormProvider from '@/providers/FormProvider'
import ShootingStars from '@/components/ShootingStars'
import Galaxy from '@/layouts/Galaxy'
import ScrollGuide from '@/layouts/ScrollGuide'
import InteractiveStars from '@/components/InteractiveStars'
import './FormPage.scss'

const FormPage = () => {
  return (
    <div className="form-page">
      <div className="space-scene">
        <Galaxy />
        <ScrollGuide />
        <InteractiveStars />
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