import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '../../store/channels'
import { setActiveChannel, getActiveChannel, toggleModal } from '../../store/app.slice'
import { Channel } from './Channel'

import './ChannelList.css'

export const ChannelList = () => {
  const dispatch = useDispatch()
  const { data } = useGetChannelsQuery()
  const activeChannel = useSelector(state => getActiveChannel(state))

  const onSetActiveChannel = (id) => {
    dispatch(setActiveChannel(id))
  }

  const onShowChannelForm = () => {
    dispatch(toggleModal({ isOpen: true, modalType: 'create' }))
  }

  const channelslist = data && data.map((channel, id) => {
    return (
      <Channel handleClick={onSetActiveChannel} key={`${channel.name}-${id}`} channel={channel} active={activeChannel === channel.id} />
    )
  })

  return (
    <>
      <div className="channels">
        {channelslist}
        <div className="addChannelButton" onClick={onShowChannelForm}>+</div>
      </div>
    </>
  )
}
