import { getActiveChannel, modalSelector, toggleModal } from '../../store/app.slice'
import { useGetMessagesQuery } from '../../store/messages'
import { ChannelForm } from '../channel-form'
import { MessageForm } from './message-form'
import './Chat.css'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const Chat = () => {
  const { t } = useTranslation()
  const activeChannel = useSelector(getActiveChannel)
  const { isOpen: isShowChannelForm } = useSelector(modalSelector)
  const { data, error, isLoading } = useGetMessagesQuery()
  console.log('Messages data:', data)
  if (data && data.length > 0) {
    console.log('First message structure:', data[0])
  }

  const messages = data && data.filter(message => message.channelId === activeChannel).map(message => (
    <p key={`${message.body}${message.id}`}>
      <strong>
        {message.username}
        :
        {' '}
      </strong>
      {message.body}
    </p>
  ))

  if (error) return <p>Loading error.</p>
  if (isLoading) return <p>{t('chat.loading')}</p>

  return (
    <div className="chat">
      <div className="textarea">
        {messages}
      </div>
      <div className="send-block">
        <MessageForm activeChannel={activeChannel} />
      </div>
      {isShowChannelForm && <ChannelForm handleCancel={() => toggleModal(false)} />}
    </div>
  )
}
