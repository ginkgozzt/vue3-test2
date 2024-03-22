import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
console.log(import.meta,'import.meta');
console.log(vue(),'vue()');

// https://vitejs.dev/config/
export default defineConfig({
  base:'/ginkgo/',
  define:{
    foo: '123'
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    headers:{
      cookie:'ddd'
    },
    proxy:{
      '/adops':{
        target:'https://10.21.21.72',
        changeOrigin: true
      }
    }
  }
})
