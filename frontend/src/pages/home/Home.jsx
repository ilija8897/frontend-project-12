import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './Home.css'
import { useDispatch } from 'react-redux';
import { getChannels } from '../../store/channels.slice';
import { ChannelList } from '../../components/channel-list';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    } else {
      dispatch(getChannels());
    }
  }, [])

  return (
    <>
      <h3>ChatReact</h3>
      <main>
        <ChannelList />
      </main>
    </>
  )
}

