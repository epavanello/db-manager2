import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [svelte()],
  resolve: {
    alias: {
      $components: path.resolve(path.dirname(''), './src/components'),
      $lib: path.resolve(path.dirname(''), './src/lib'),
      $containers: path.resolve(path.dirname(''), './src/containers'),
      $styles: path.resolve(path.dirname(''), './src/styles'),
      $lib: path.resolve(path.dirname(''), './src/lib'),
      $assets: path.resolve(path.dirname(''), './src/assets'),
    },
  },
})
