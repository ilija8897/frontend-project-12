import './ChannelForm.css'
import { useDeleteChannelMutation } from '../../store/channels'
import { modalSelector, toggleModal } from '../../store/app.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const DeleteChannelForm = () => {
  const { t } = useTranslation()
  const disatch = useDispatch()
  const { editedChannel } = useSelector(modalSelector)
  const [deleteChannel] = useDeleteChannelMutation()
  const onClose = () => {
    disatch(toggleModal({ isOpen: false }))
  }
  const handleDeleteChannel = () => {
    deleteChannel({ id: editedChannel.id })
    onClose()
  }

  return (
    <div className="channelForm">
      <h4>{t('channels.deleteChannel')}</h4>
      <button className="btn-danger" onClick={handleDeleteChannel}>
        { t('channels.buttonModal') }
      </button>
      <button type="submit" onClick={onClose}>
        {t('modals.cancel')}
      </button>
    </div>
  )
}
