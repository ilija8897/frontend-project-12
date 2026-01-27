import { toggleModal } from '../../store/app.slice'
// import { useDeleteChannelMutation } from '../../store/channels';
// import { messagesApi } from '../../store/messages';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
export const EditChannelPannel = ({ channel }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  // const [ deleteChannel ] = useDeleteChannelMutation();
  const handleEditChannel = (e) => {
    e.stopPropagation()
    dispatch(toggleModal({ isOpen: true, modalType: 'edit', editedChannel: channel }))
  }
  const handleDeleteChannel = async (e) => {
    e.stopPropagation()
    dispatch(toggleModal({ isOpen: true, modalType: 'delete', editedChannel: channel }))
    // try {
    //     await deleteChannel({ id: channel.id });
    //     dispatch(messagesApi.util.invalidateTags(['Message']));
    // } catch (error) {
    //     console.error('Ошибка при удалении канала:', error);
    // }
  }
  return (
    <div>
      <button className="editButton" onClick={handleEditChannel}>{t('channels.editChannel')}</button>
      <button className="editButton" onClick={handleDeleteChannel}>{t('channels.remove')}</button>
    </div>
  )
}
