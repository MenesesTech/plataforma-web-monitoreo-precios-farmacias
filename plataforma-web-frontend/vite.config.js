import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    allowedHosts: [
      'f6ef-38-253-147-163.ngrok-free.app'
    ]
  }
})
