import { Formik, Form, Field, ErrorMessage } from 'formik'
import './RegistrationForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/auth.slice'
import * as yup from 'yup'
import { authErrorSelector } from '../../selectors/auth.selectors'
import { useTranslation } from 'react-i18next'

export const RegistrationForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector(authErrorSelector)
  const handleSubmit = async (values) => {
    dispatch(signup(values))
  }

  let registrationSchema = yup.object().shape({
    username: yup.string().required(t('signup.required')).min(3, t('signup.nameLengthError')).max(20, t('signup.nameLengthError')),
    password: yup.string().required(t('signup.required')).min(6, t('signup.lengthError')),
    repeatPassword: yup.string().test('repeatPassword', t('signup.notMatch'), (value, context) => value === context.parent.password),
  })

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '', repeatPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
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
    </>
  )
}
