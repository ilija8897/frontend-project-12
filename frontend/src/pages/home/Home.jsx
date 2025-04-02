import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import './Home.css'

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <h3>ChatReact</h3>
    </>
  )
}

