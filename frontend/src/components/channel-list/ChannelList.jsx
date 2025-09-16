// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '../../store/channels'
import { setActiveChannel, getActiveChannel } from '../../store/app.slice'
import { Channel } from './Channel'

import './ChannelList.css';

export const ChannelList = () => {
    const dispatch = useDispatch();
    // const [activeChannel, setActiveChannel] = useState('1');
    const { data } = useGetChannelsQuery();
    const activeChannel = useSelector(state => getActiveChannel(state));

    const onSetActiveChannel = (id) => {
        dispatch(setActiveChannel(id))
    }

    const channelslist = data && data.map((channel) => {
        console.log(typeof channel.id, channel.id);
        console.log('activeChannel', typeof activeChannel, activeChannel);
        
        return (
            <Channel handleClick={onSetActiveChannel} key={channel.id} channel={channel} active={activeChannel === channel.id} />
        )
    })

    return (
        <div className='channels'>
            {channelslist}
        </div>
    )
}
