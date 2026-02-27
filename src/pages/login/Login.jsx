import { LoginForm } from '../../components/login-form'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  const { t } = useTranslation()
  return (
    <div className="d-flex h-100 flex-column">
      <h3>{t('login.header')}</h3>
      <LoginForm />
    </div>

  )
}
