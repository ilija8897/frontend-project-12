import { Formik, Form, Field } from 'formik';

import './Login.css'

export const Login = () => {
    return (
        <>
        <h3>Login</h3>
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                <Field type="email" name="email" />
                <Field type="password" name="password" />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
        </Formik>
        </>

    )
}
