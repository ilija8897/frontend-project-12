import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './Home.css'
import { useDispatch } from 'react-redux';
import { getChannels } from '../../store/channels.slice';
import { getMessages } from '../../store/messages.slice';
import { ChannelList } from '../../components/channel-list';
import { Chat } from '../../components/chat';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    } else {
      dispatch(getChannels());
      dispatch(getMessages());
    }
  })

  return (
    <>
      <h3>ChatReact</h3>
      <main>
        <ChannelList />
        <Chat />
      </main>
    </>
  )
}

