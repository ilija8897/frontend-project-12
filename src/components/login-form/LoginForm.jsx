import { Formik, Form, Field } from 'formik';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth.slice';
import { authErrorSelector } from '../../selectors/auth.selectors';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const error = useSelector(authErrorSelector);
    const handleSubmit = async (values) => {
        dispatch(login(values));
    }
    console.log(error);
    
    const errorMap = {
        401: t('login.authFailed'),
    }

    return (
        <>
        <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="login" name="username" placeholder={t('login.name')} />
                    <Field type="password" name="password" placeholder={t('login.password')} />
                    <button type='submit' disabled={isSubmitting}>
                        {t('login.button')}
                    </button>
                    {error && <p>{errorMap[error.payload.status]}</p>}
                </Form>
            )}
        </Formik>
        </>
    )
}