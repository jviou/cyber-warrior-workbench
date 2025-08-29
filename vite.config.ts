import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['crisis-app.capucins-angers.fr'],
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ['crisis-app.capucins-angers.fr'], // << important
  },
})
