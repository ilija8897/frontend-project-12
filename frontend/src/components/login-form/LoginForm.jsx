import { Formik, Form, Field } from 'formik';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth.slice';
import { authErrorSelector } from '../../selectors/auth.selectors';

const FORM_TYPE = {
    REG: 'registration',
    LOGIN: 'login'
}

export const LoginForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(authErrorSelector);
    const handleSubmit = async (values) => {
        dispatch(login(values)).unwrap()
    }

    return (
        <>
        <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="login" name="login" />
                    <Field type="password" name="password" />
                    <button type='submit' disabled={isSubmitting}>
                        LogIn/SignUp
                    </button>
                    {error && <p>{error}</p>}
                </Form>
            )}
        </Formik>
        </>
    )
}