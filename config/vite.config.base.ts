import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, '../src/assets/css/_reset.less')}";`,
        javascriptEnabled: true,
      }
    },
    postcss: {
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: [
            'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true
        })
      ]
    }
  },
  resolve: {
    //设置别名
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      }
    ],
    extensions: ['.ts', '.js']
  }
})
