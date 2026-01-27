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

    const [ sendMessage, { data, isLoading, error } ] = useSendMessageMutation(); 
    console.log('sendMessage result:', { data, isLoading, error });
    
  const validationSchema = yup.object().shape({
    message: yup
      .string()
      .required(),
  })

  return (
    <Formik
        initialValues={{ message: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log('Form submitted with values:', values);
          
            const message = { body: filter.clean(values.message), channelId: activeChannel, username };
            console.log('Sending message:', message);
            
            try {
              const result = await sendMessage(message).unwrap();
              console.log('Message sent successfully:', result);
              resetForm();
            } catch (err) {
              console.error('Failed to send message:', err);
            }
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
