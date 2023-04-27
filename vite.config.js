import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// 文件别名
import path from 'path'

export default defineConfig({
  // 配置文件系统路径别名
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },

  // vite --sever.proxy实现跨域请求
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },

  plugins: [vue(), WindiCSS(),],
})
