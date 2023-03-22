import 'core-js'
import { createApp } from 'vue'
import App from './App.vue'
console.log(['main', 'dd'].includes('main'))

createApp(App).mount('#app')
