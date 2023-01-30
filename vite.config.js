import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  root: './',
  publicDir: 'src/public/',
  server: {
    proxy: {
      '/graphql': {
        target: 'https://devapi.studs.se/',
        changeOrigin: true
      }
    }
  }
})
