import { useDeleteChannelMutation } from '../../store/channels'
import { modalSelector, toggleModal } from '../../store/app'
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
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {t('channels.deleteChannel')}
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={handleDeleteChannel}>
              { t('channels.buttonModal') }
            </button>
            <button type="submit" className="btn btn-secondary" onClick={onClose}>
              {t('modals.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
