import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://127.0.0.1:5001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://127.0.0.1:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
