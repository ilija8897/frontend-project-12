import { Formik, Form, Field } from 'formik';
import './RegistrationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/auth.slice';
import { authErrorSelector } from '../../selectors/auth.selectors';

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(authErrorSelector);
    const handleSubmit = async (values) => {
        dispatch(signup(values)).unwrap()
        .then((res) => {
            console.log(res);
            
        })
        .catch((e) => {
            console.log(e);
        })

    }

    return (
        <>
        <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="login" name="login" placeholder='login' />
                    <Field type="password" name="password" placeholder='type password' />
                    {/* <Field type="password" name="password" placeholder='repeat password' /> */}
                    <button type='submit' disabled={isSubmitting}>
                        Create account
                    </button>
                    {error && <p>{error}</p>}
                </Form>
            )}
        </Formik>
        </>
    )
}