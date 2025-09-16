import { useState } from 'react';
import { getActiveChannel } from '../../store/app.slice';
import { useGetMessagesQuery, useSendMessageMutation } from '../../store/messages';
// import { useGetMessagesQuery, useSendMessageMutation } from '../../store/channels';
import './Chat.css';
import { useSelector } from 'react-redux';

export const Chat = () => {
  // const messagesData = useSelector(messagesSelector);
  const [message, setMessage] = useState('');
  const activeChannel = useSelector(getActiveChannel);
  const { data, error, isLoading } = useGetMessagesQuery();
  
  const [ sendMessage ] = useSendMessageMutation();

  const handleSendMessage = async () => {
    await sendMessage({ body: message, channelId: activeChannel, username: 'admin' });
    setMessage('');
    // dispatch(postMessages({message}));
  }
  const handleChangeInput = (e) => {
    setMessage(e.target.value);
  };
  console.log(activeChannel);
  // console.log(data);
  
  const messages = data && data.filter((message) => message.channelId === activeChannel).map((message) => <p key={`${message.body}${message.id}`}>{message.body}</p>)

  if (error) return <p>Loading error.</p>
  if (isLoading) return <p>Loading...</p>
  // console.log(messages);
  
  return (
    <div className='chat'>
    <div className='textarea'>
        {messages}
    </div>
    <div className="send-block">
    <input className='message-field' onChange={handleChangeInput} type="text" placeholder='message' value={message}/>
    <button className='send-button' onClick={handleSendMessage}>send</button>
    </div>
    </div>
  )
}
