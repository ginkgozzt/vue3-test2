import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv ,UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig(({ mode }:any):UserConfig  => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  const target = 'https://10.21.21.72';

  
  return {
    // vite 配置
    base: env.VITE_BASE,
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      foo: '123'
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'utils': fileURLToPath(new URL('./src/utils', import.meta.url))
      }
    },
    server: {
      headers: {
        cookie: env.VITE_APP_Cookie
      },
      proxy: {
        '/adops': {
          secure: false,
          target,
          changeOrigin: true

        },
        '/aos/': {
          target,
          secure: false,
          changeOrigin: true,
          headers: {
            cookie: env.VITE_APP_Cookie
          },
        }
      }
    }
  }
})

