import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11', 'firefox >= 37'],
    }),
  ],
  resolve: {
    alias: {
      // https://github.com/Benleie/moduleBundlerTemplate/issues/3
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9300,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        // target: 'localhost:3434',
        target: 'http://localhost:3434',
        // target: 'https://testauth.leyopharm.com',
        // target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        // rewrite: (proxyPath) => proxyPath.replace(/^\/ben-server/, ''),
        // secure: false,
        // ws: true,
      },
    },
  },
})
