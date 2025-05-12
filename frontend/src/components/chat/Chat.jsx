import { useState } from 'react';
import { postMessages, messagesSelector } from '../../store/messages.slice';
import './Chat.css';
import { useDispatch, useSelector } from 'react-redux';

export const Chat = () => {
  const messagesData = useSelector(messagesSelector);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    dispatch(postMessages({message}));
  }
  const handleChangeInput = () => {
    setMessage();
  }

  const messages = messagesData.map((message, id) => <p key={`${message.name}${id}`}>{message.name}</p>)

  return (
    <div className='chat'>
    <div className='textarea'>
        {messages}
    </div>
    <div className="send-block">
    <input className='message-field' onChange={handleChangeInput} type="text" placeholder='message'/>
    <button className='send-button' onClick={handleSendMessage}>send</button>
    </div>
    </div>
  )
}
