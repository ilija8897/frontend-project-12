import { toggleModal } from '../../store/app'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
export const EditChannelPannel = ({ channel }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const handleEditChannel = (e) => {
    e.stopPropagation()
    dispatch(toggleModal({ isOpen: true, modalType: 'edit', editedChannel: channel }))
  }
  const handleDeleteChannel = async (e) => {
    e.stopPropagation()
    dispatch(toggleModal({ isOpen: true, modalType: 'delete', editedChannel: channel }))
  }
  return (
    <div>
      <button className="fs-6" onClick={handleEditChannel}>{t('channels.editChannel')}</button>
      <button className="fs-6" onClick={handleDeleteChannel}>{t('channels.remove')}</button>
    </div>
  )
}
