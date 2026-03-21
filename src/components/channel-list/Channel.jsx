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
    <div className="btn-group-vertical mb-2">
      <button onClick={onSetActiveChannel} type="button" className={active ? 'active btn btn-primary' : 'btn btn-primary'}>
        #
        {channel.name}
      </button>
      {channel.removable && <button className="btn btn-info text-white" onClick={handleEdit}>{t('channels.channelEdit')}</button>}
      {Boolean(isVisibleEditPannel && channel.removable) && <EditChannelPannel channel={channel} />}
    </div>
  )
}
