import { RegistrationForm } from '../../components/reg-form'
import { useTranslation } from 'react-i18next'

export const Registration = () => {
  const { t } = useTranslation()
  return (
    <div className="d-flex h-100 flex-column">
      <h3>{t('signup.header')}</h3>
      <RegistrationForm />
    </div>

  )
}
