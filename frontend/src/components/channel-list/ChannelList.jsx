// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '../../store/channels'
import { setActiveChannel, getActiveChannel, toggleModal } from '../../store/app.slice'
import { Channel } from './Channel'
import { ChannelForm } from '../channel-form'

import './ChannelList.css';

export const ChannelList = () => {
    const dispatch = useDispatch();
    // const [activeChannel, setActiveChannel] = useState('1');
    // const [isShowChannelForm, setVisibilityChannelForm] = useState(false);
    const { data } = useGetChannelsQuery();
    const activeChannel = useSelector(state => getActiveChannel(state));
    // const { isOpen:  } = useSelector(modalSelector);

    const onSetActiveChannel = (id) => {
        dispatch(setActiveChannel(id))
    }

    const onShowChannelForm = () => {
        dispatch(toggleModal({ isOpen: true, modalType: 'create' }));
    }

    // const handleCloseChannelForm = () => {
    //     dispatch(toggleModal({ isOpen: false }));
    // }

    const channelslist = data && data.map((channel, id) => {
        return (
            <Channel handleClick={onSetActiveChannel} key={`${channel.name}-${id}`} channel={channel} active={activeChannel === channel.id} />
        )
    })

    return (
        <>
            <div className='channels'>
                {channelslist}
                <div className='addChannelButton' onClick={onShowChannelForm}>+</div>
            </div>
            {/* {isShowChannelForm && <ChannelForm handleCancel={handleCloseChannelForm} />} */}
        </>
    )
}
