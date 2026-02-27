import { useState } from 'react'
import { EditChannelPannel } from './EditChannelPannel'
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
    <div className="d-flex flex-column">
      <button onClick={onSetActiveChannel} className={active ? 'active-channel btn-primary' : 'btn-primary'}>
        #
        {channel.name}
      </button>
      {channel.removable && <button className="fd-6" onClick={handleEdit}>{t('channels.channelEdit')}</button>}
      {Boolean(isVisibleEditPannel && channel.removable) && <EditChannelPannel channel={channel} />}
    </div>
  )
}
