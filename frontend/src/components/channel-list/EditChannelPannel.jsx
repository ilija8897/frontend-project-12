import { toggleModal } from '../../store/app.slice';
import { useDeleteChannelMutation } from '../../store/channels';
import { messagesApi } from '../../store/messages';
import { useDispatch } from 'react-redux';

export const EditChannelPannel = ({ channel }) => {
    const dispatch = useDispatch();
    const [ deleteChannel ] = useDeleteChannelMutation();
    // const [ editChannel ] = useEditChannelMutation();
    const handleEditChannel = (e) => {
        e.stopPropagation();
        dispatch(toggleModal({ isOpen: true, modalType: 'edit', editedChannel: channel }));
    }
    const handleDeleteChannel = async (e) => {
        e.stopPropagation();
        try {
            await deleteChannel({ id: channel.id });
            dispatch(messagesApi.util.invalidateTags(['Message']));
        } catch (error) {
            console.error('Ошибка при удалении канала:', error);
        }
    }
    return (
        <div>
        <button className='editButton' onClick={handleEditChannel}>&#9998;</button>
        <button className='editButton' disabled={!channel.removable} onClick={handleDeleteChannel}>&#128465;</button>
        </div>
    )
}
