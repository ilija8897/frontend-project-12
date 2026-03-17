import { Formik, Form, Field } from 'formik'
import { useEffect } from 'react'
import './LoginForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { login } from '../../store/auth'
import { authErrorSelector, isAuthSelector } from '../../selectors/auth.selectors'
import { useTranslation } from 'react-i18next'

export const LoginForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(authErrorSelector)
  const isAuthentificate = useSelector(isAuthSelector)
  const handleSubmit = async (values) => {
    dispatch(login(values))
  }

  useEffect(() => {
    if (isAuthentificate) {
      navigate('/')
    }
  })

  const errorMap = {
    401: t('login.authFailed'),
  }

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="col-2">
            <label className="form-label w-100" htmlFor="username">{t('login.name')}</label>
            <Field className="w-100" type="text" id="username" name="username" placeholder={t('login.name')} />
            <label className="form-label w-100" htmlFor="password">{t('login.password')}</label>
            <Field className="w-100" type="password" id="password" name="password" placeholder={t('login.password')} />
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {t('login.button')}
            </button>
            {error && <p>{errorMap[error.payload.status]}</p>}
          </Form>
        )}
      </Formik>
    </>
  )
}
