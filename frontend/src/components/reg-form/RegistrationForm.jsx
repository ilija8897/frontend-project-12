import { Formik, Form, Field, ErrorMessage } from 'formik';
import './RegistrationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/auth.slice';
import * as yup from 'yup';
import { authErrorSelector } from '../../selectors/auth.selectors';

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(authErrorSelector);
    const handleSubmit = async (values) => {
        dispatch(signup(values))
    }

    let registrationSchema = yup.object().shape({
        login: yup.string().required().min(3).max(20),
        password: yup.string().required().min(6),
        repeatPassword: yup.string().required().min(6).test('repeatPassword', 'signup.mustMatch', (value, context) => value === context.parent.password),
    });

    return (
        <>
        <Formik
            initialValues={{ login: '', password: '', repeatPassword: '' }}
            onSubmit={handleSubmit}
            validationSchema={registrationSchema}
            >
            {({values, isSubmitting }) => (
                <Form>
                    <Field type="login" name="login" placeholder='login' value={values.login} />
                    <Field type="password" name="password" placeholder='type password' value={values.password} />
                    <Field type="password" name="repeatPassword" placeholder='repeat password' value={values.repeatPassword} />
                    <ErrorMessage name="login" />
                    <ErrorMessage name="password" />
                    <ErrorMessage name="repeatPassword" />
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