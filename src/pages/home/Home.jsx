import { useEffect } from 'react'
import { useNavigate } from 'react-router'
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
    <div className="d-flex h-100 flex-column">
      <h3>ChatReact</h3>
      <main className="d-flex h-100">
        <ChannelList />
        <Chat />
      </main>
    </div>
  )
}
