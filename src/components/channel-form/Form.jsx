import { Formik } from 'formik'

import './ChannelForm.css'
import { useAddChannelMutation, useEditChannelMutation, useGetChannelsQuery } from '../../store/channels'
import { modalSelector, toggleModal, setActiveChannel } from '../../store/app.slice'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import filter from 'leo-profanity'

export const Form = () => {
  const { t } = useTranslation()
  const disatch = useDispatch()
  const { data } = useGetChannelsQuery()
  const { modalType, editedChannel } = useSelector(modalSelector)
  const [addChannel] = useAddChannelMutation()
  const [editChannel] = useEditChannelMutation()
  const onClose = () => {
    disatch(toggleModal({ isOpen: false }))
  }
  console.log('ffoofrofor')

  let channelSchema = yup.object().shape({
    name: yup.string().required().min(3, t('modals.channelLengthError')).max(20, t('modals.channelLengthError')).notOneOf(data.map(channel => channel.name)),
  })
  const handleAddChannel = async (values) => {
    const result = await addChannel({ name: filter.clean(values.name) })
    if (result.data) {
      disatch(setActiveChannel(result.data.id))
    }
  }
  const handleEditChannel = (values) => {
    editChannel({ id: editedChannel.id, name: filter.clean(values.name) })
  }

  const titleMap = {
    edit: t('channels.editChannel'),
    delete: t('channels.deleteChannel'),
    create: t('channels.createChannel'),
  }

  return (
    <div className="channelForm">
      <h4>{titleMap[modalType]}</h4>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={channelSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (modalType === 'create') {
            await handleAddChannel(values)
          }
          if (modalType === 'edit') {
            handleEditChannel(values)
          }
          setSubmitting(false)
          onClose()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="channelName">{t('modals.editChannelName')}</label>
            <input
              type="text"
              name="name"
              id="channelName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              autoFocus={true}
              placeholder={t('modals.editChannelName')}
            />
            {errors.name && touched.name && errors.name}
            <button className="btn-danger" type="submit" disabled={isSubmitting}>
              { t('channels.buttonModal') }
            </button>
            <button type="submit" onClick={onClose}>
              {t('modals.cancel')}
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
