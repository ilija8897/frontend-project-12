import { Formik, Form, Field } from 'formik';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth.slice';
import { authErrorSelector } from '../../selectors/auth.selectors';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(authErrorSelector);
    const handleSubmit = async (values) => {
        dispatch(login(values))
    }

    return (
        <>
        <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="login" name="username" />
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