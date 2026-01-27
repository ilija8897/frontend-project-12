import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './Home.css'
import { ChannelList } from '../../components/channel-list'
import { Chat } from '../../components/chat'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
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
