import { useSelector } from 'react-redux'
import { getChannelsSelector } from '../../selectors/channels.selectors'
import { Channel } from './Channel'

import './ChannelList.css';

export const ChannelList = () => {
    const channels = useSelector(getChannelsSelector);

    const channelslist = channels.map((channel) => {
        return (
            <Channel channel={channel} />
        )
    })

    return (
        <div className='channels'>
            {channelslist}
        </div>
    )
}
