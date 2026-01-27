import { useState } from 'react'
import { EditChannelPannel } from './EditChannelPannel'
import './ChannelList.css'
import { useTranslation } from 'react-i18next'

export const Channel = ({ channel, active, handleClick }) => {
  const { t } = useTranslation()
  const [isVisibleEditPannel, setVisibilityEditPannel] = useState(false)
  const onSetActiveChannel = (e) => {
    e.stopPropagation()
    handleClick(channel.id)
  }
  const handleEdit = (e) => {
    e.stopPropagation()
    setVisibilityEditPannel(value => !value)
  }
  return (
    <div>
      <button onClick={onSetActiveChannel} className={active ? 'active-channel' : ''}>
        #
        {channel.name}
      </button>
      {channel.removable && <button className="editButton" onClick={handleEdit}>{t('channels.channelEdit')}</button>}
      {Boolean(isVisibleEditPannel && channel.removable) && <EditChannelPannel channel={channel} />}
    </div>
  )
}
