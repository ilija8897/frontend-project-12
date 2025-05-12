import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelsSelector } from '../../selectors/channels.selectors'
import channelsSlice from '../../store/channels.slice'
import { Channel } from './Channel'

import './ChannelList.css';

export const ChannelList = () => {
    const dispatch = useDispatch();
    const [activeChannel, setActiveChannel] = useState('1');
    const channels = useSelector(getChannelsSelector);

    const onSetActiveChannel = (id) => {
        setActiveChannel(id)
        dispatch(channelsSlice.actions.setActiveChannel(id))
    }

    const channelslist = channels.map((channel, id) => {
        return (
            <Channel handleClick={onSetActiveChannel} key={id} channel={channel} active={activeChannel === channel.id} />
        )
    })

    return (
        <div className='channels'>
            {channelslist}
        </div>
    )
}
