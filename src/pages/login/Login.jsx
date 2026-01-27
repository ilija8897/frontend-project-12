import './Login.css'
import { LoginForm } from '../../components/login-form'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  const { t } = useTranslation()
  return (
    <>
      <h3>{t('login.header')}</h3>
      <LoginForm />
    </>

  )
}
