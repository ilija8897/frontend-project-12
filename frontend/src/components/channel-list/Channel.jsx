import './ChannelList.css';

export const Channel = ({ channel, active, handleClick }) => {
  const onSetActiveChannel = () => {
    handleClick(channel.id)
  }
  return (
    <article onClick={onSetActiveChannel} className={active ? 'active-channel' : ''}>{channel.name}</article>
  )
}
