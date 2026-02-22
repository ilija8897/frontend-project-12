import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Registration } from './pages/registration'
import { NotFound } from './pages/not-found'
import { Header } from './components/header'
import { io } from 'socket.io-client'
import { ToastContainer } from 'react-toastify'
import { Provider, ErrorBoundary } from '@rollbar/react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { socketInit } from './socket-init'

export const App = () => {
  const { t } = useTranslation()

  useEffect(() => {
    const socket = io()

    socketInit(socket, t)

    return () => {
      socket.disconnect()
    }
  }, [t])

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'testenv',
  }

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ErrorBoundary>
    </Provider>
  )
}
