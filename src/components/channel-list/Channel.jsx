import { useState } from 'react';
import { EditChannelPannel } from './EditChannelPannel';
import './ChannelList.css';

export const Channel = ({ channel, active, handleClick }) => {
  const [ isVisibleEditPannel, setVisibilityEditPannel ] = useState(false);
  const onSetActiveChannel = () => {
    handleClick(channel.id)
  }
  const handleEdit = (e) => {
    e.stopPropagation();
    setVisibilityEditPannel((value) => !value);
  }
  return (
    <article onClick={onSetActiveChannel} className={active ? 'active-channel' : ''}>
      #{channel.name}
      <button className='editButton' onClick={handleEdit}>&#9881;</button>
      {isVisibleEditPannel && <EditChannelPannel channel={channel} />}
    </article>
  )
}
