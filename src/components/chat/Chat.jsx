import { getActiveChannel, modalSelector, toggleModal } from '../../store/app.slice';
import { useGetMessagesQuery } from '../../store/messages';
import { ChannelForm } from '../channel-form'
import { MessageForm } from './message-form'
import './Chat.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const Chat = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector(getActiveChannel);
  const { isOpen: isShowChannelForm } = useSelector(modalSelector);
  const { data, error, isLoading } = useGetMessagesQuery();

  const messages = data && data.filter((message) => message.channelId === activeChannel).map((message) => <p key={`${message.body}${message.id}`}>{message.body}</p>)

  if (error) return <p>Loading error.</p>
  if (isLoading) return <p>{t('chat.loading')}</p>
  
  return (
    <div className='chat'>
    <div className='textarea'>
        {messages}
    </div>
    <div className="send-block">
    <MessageForm activeChannel={activeChannel} />
    </div>
    {isShowChannelForm && <ChannelForm handleCancel={() => toggleModal(false)} />}
    </div>
  )
}
