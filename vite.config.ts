import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [uni()],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: false,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      '/API': {
        target: 'https://gmall-prod.atguigu.cn/skb',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/API/, ''),
      },
    },
  },
})
