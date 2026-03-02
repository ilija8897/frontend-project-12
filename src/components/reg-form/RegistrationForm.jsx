import { Formik, Form, Field, ErrorMessage } from 'formik'
import './RegistrationForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/auth'
import { registrationSchema } from '../../validators'
import { authErrorSelector } from '../../selectors/auth.selectors'
import { useTranslation } from 'react-i18next'

export const RegistrationForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector(authErrorSelector)
  const handleSubmit = async (values) => {
    dispatch(signup(values))
  }

  return (
    <div className="w-50">
      <Formik
        initialValues={{ username: '', password: '', repeatPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema(t)}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <label htmlFor="username">{t('signup.name')}</label>
            <Field type="login" id="username" name="username" placeholder={t('signup.name')} value={values.username} />

            <label htmlFor="password">{t('signup.password')}</label>
            <Field type="password" id="password" name="password" placeholder={t('signup.password')} value={values.password} />

            <label htmlFor="repeatPassword">{t('signup.repeatPassword')}</label>
            <Field type="password" id="repeatPassword" name="repeatPassword" placeholder={t('signup.repeatPassword')} value={values.repeatPassword} />
            <ErrorMessage name="username" />
            <ErrorMessage name="password" />
            <ErrorMessage name="repeatPassword" />
            <button type="submit" disabled={isSubmitting}>
              {t('signup.button')}
            </button>
            {error && <p>{error.status === 409 ? t('signup.alreadyExists') : error}</p>}
          </Form>

        )}
      </Formik>
    </div>
  )
}
