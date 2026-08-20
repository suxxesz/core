import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path' // Импортируем path вместо node:url

export default defineConfig({
  base: '/core/' ,
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // Привязываем символ @ строго к папке src
      '@': path.resolve(__dirname, './src'),
    },
  },
})
