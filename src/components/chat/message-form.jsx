import { Formik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

import { useSendMessageMutation } from '../../store/messages.js'
import { getUserSelector } from '../../store/auth.slice.js'
import { useSelector } from 'react-redux'

export const MessageForm = ({ activeChannel }) => {
  const { t } = useTranslation()
  const username = useSelector(getUserSelector)

    const [ sendMessage, { data } ] = useSendMessageMutation(); 
    console.log(data);
    
  const validationSchema = yup.object().shape({
    message: yup
      .string()
      .required(),
  })

  return (
    <Formik
        initialValues={{ message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('values', values);
          
            const message = { body: filter(values.message), channelId: activeChannel, username };
            sendMessage(message);
            resetForm();
        }}
        >
        {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    autoFocus={true}
                    placeholder={'сообщение'}
                />
                {errors.message && errors.message}
                <button type="submit" disabled={isSubmitting}>
                    {t('modals.sendButton')}
                </button>
            </form>
        )}
    </Formik>
  )
}
