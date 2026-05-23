import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , svgr()],

   resolve: {
    alias: {
      // Указываем, что '@' соответствует папке 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
})
