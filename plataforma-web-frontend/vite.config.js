import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  // server: {
  //   host: true, // importante para que acepte conexiones externas
  //   allowedHosts: [
  //     'andrews-vatican-intention-pounds.trycloudflare.com'
  //   ]
  // }
})
