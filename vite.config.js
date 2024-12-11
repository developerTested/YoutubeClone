import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  const vite_port = env.PORT || 3000;

  return {
    server: {
      port: vite_port,
      proxy: {
        '/api': {
          target: env.VITE_YOUTUBE_BACKEND_API || 'http://localhost:3001/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    },
    plugins: [react()],
  }
});
