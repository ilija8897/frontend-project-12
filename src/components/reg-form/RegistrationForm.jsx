import { Formik, Form, Field, ErrorMessage } from 'formik'
import './RegistrationForm.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/auth'
import { registrationSchema } from '../../validators'
import { authErrorSelector, isAuthSelector } from '../../selectors/auth.selectors'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export const RegistrationForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector(authErrorSelector)
  const handleSubmit = async (values) => {
    dispatch(signup(values))
  }
  const navigate = useNavigate()
  const isAuthentificate = useSelector(isAuthSelector)
  useEffect(() => {
    if (isAuthentificate) {
      navigate('/')
    }
  })
  return (
    <>
      <Formik
        initialValues={{ username: '', password: '', repeatPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema(t)}
      >
        {({ values, isSubmitting }) => (
          <Form className="col-2">
            <label className="form-label w-100" htmlFor="username">{t('signup.name')}</label>
            <Field className="w-100" type="login" id="username" name="username" placeholder={t('signup.name')} value={values.username} />
            <ErrorMessage className="d-block invalid-feedback" component="p" name="username" />

            <label className="form-label w-100" htmlFor="password">{t('signup.password')}</label>
            <Field className="w-100" type="password" id="password" name="password" placeholder={t('signup.password')} value={values.password} />
            <ErrorMessage className="d-block invalid-feedback" component="p" name="password" />

            <label className="form-label w-100" htmlFor="repeatPassword">{t('signup.repeatPassword')}</label>
            <Field className="w-100" type="password" id="repeatPassword" name="repeatPassword" placeholder={t('signup.repeatPassword')} value={values.repeatPassword} />
            <ErrorMessage className="d-block invalid-feedback" component="p" name="repeatPassword" />
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {t('signup.button')}
            </button>
            {error && <p>{error.status === 409 ? t('signup.alreadyExists') : error}</p>}
          </Form>

        )}
      </Formik>
    </>
  )
}
