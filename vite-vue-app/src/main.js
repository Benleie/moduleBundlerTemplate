import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

let hh = 'hh';
console.log(hh)
console.log(hh, ['f', 'ff'].includes('ffff'))

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
