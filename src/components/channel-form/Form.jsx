import { Formik } from 'formik'

import { useAddChannelMutation, useEditChannelMutation, useGetChannelsQuery } from '../../store/channels'
import { modalSelector, toggleModal, setActiveChannel } from '../../store/app'
import { getChannelSchema } from '../../validators'

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

  let channelSchema = getChannelSchema(data, t)
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
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {titleMap[modalType]}
          </div>
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
                  className="input"
                  name="name"
                  id="channelName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoFocus={true}
                  placeholder={t('modals.editChannelName')}
                />
                {errors.name && touched.name && errors.name}
                <div className="modal-footer">
                  <button className="btn btn-danger" type="submit" disabled={isSubmitting}>
                    { t('channels.buttonModal') }
                  </button>
                  <button className="btn btn-secondary" type="submit" onClick={onClose}>
                    {t('modals.cancel')}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
