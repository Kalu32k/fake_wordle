import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/random': 'http://localhost:5080',
      '/api/guess': 'http://localhost:5080',
      '/api/highscore': 'http://localhost:5080',
      '/api/highscores': 'http://localhost:5080',
    },
  },
});