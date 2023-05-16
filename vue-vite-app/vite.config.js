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
})
