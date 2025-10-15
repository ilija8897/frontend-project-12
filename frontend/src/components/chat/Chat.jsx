// import { useState, useCallback } from 'react';
import { getActiveChannel, modalSelector, toggleModal } from '../../store/app.slice';
import { useGetMessagesQuery } from '../../store/messages';
// import { useGetMessagesQuery, useSendMessageMutation } from '../../store/channels';
import { ChannelForm } from '../channel-form'
import { MessageForm } from './message-form'
// import { setActiveChannel, getActiveChannel } from '../../store/app.slice'
import './Chat.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const Chat = () => {
  const { t } = useTranslation();
  // const [message, setMessage] = useState('');
  const activeChannel = useSelector(getActiveChannel);
  const { isOpen: isShowChannelForm } = useSelector(modalSelector);
  const { data, error, isLoading } = useGetMessagesQuery();
  
  // const [ sendMessage ] = useSendMessageMutation();

  // const handleSendMessage = useCallback(async () => {
  //   await sendMessage({ body: message, channelId: activeChannel, username: 'admin' });
  //   setMessage('');
  // });
  // const handleChangeInput = (e) => {
  //   setMessage(e.target.value);
  // };

  const messages = data && data.filter((message) => message.channelId === activeChannel).map((message) => <p key={`${message.body}${message.id}`}>{message.body}</p>)

  if (error) return <p>Loading error.</p>
  if (isLoading) return <p>{t('chat.loading')}</p>
  
  return (
    <div className='chat'>
    <div className='textarea'>
        {messages}
    </div>
    <div className="send-block">
    {/* <input className='message-field' onChange={handleChangeInput} type="text" placeholder={t('chat.inputPlaceholder')} value={message}/>
    <button className='send-button' onClick={handleSendMessage}>{t('chat.button')}</button> */}
    <MessageForm activeChannel={activeChannel} />
    </div>
    {isShowChannelForm && <ChannelForm handleCancel={() => toggleModal(false)} />}
    </div>
  )
}
