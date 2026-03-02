import { Formik } from 'formik'
import { messageSchema } from '../../validators'

import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

import { useSendMessageMutation } from '../../store/messages.js'
import { getUserSelector } from '../../store/auth.js'
import { useSelector } from 'react-redux'

export const MessageForm = ({ activeChannel }) => {
  const { t } = useTranslation()
  const username = useSelector(getUserSelector)

  const [sendMessage] = useSendMessageMutation()

  return (
    <Formik
      initialValues={{ message: '' }}
      validationSchema={messageSchema}
      onSubmit={async (values, { resetForm }) => {
        const message = { body: filter.clean(values.message), channelId: activeChannel, username }
        try {
          await sendMessage(message).unwrap()
          resetForm()
        }
        catch (err) {
          console.error('Failed to send message:', err)
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
            aria-label={t('chat.newMessageLabel')}
            autoFocus={true}
            placeholder={t('chat.inputPlaceholder')}
          />
          {errors.message && errors.message}
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {t('modals.sendButton')}
          </button>
        </form>
      )}
    </Formik>
  )
}
