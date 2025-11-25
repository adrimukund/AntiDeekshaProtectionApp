// vite.config.ts

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  return {
    // *** INSERT THIS LINE HERE ***
    base: './', 
    // ****************************
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // ... your define block
    },
    resolve: {
      // ... your resolve block
    }
  }
})
