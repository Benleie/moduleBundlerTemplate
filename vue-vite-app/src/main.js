import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import { pageRoutes } from './router/route'

let hh = 'hh';
console.log(hh)
console.log(hh, ['f', 'ff'].includes('ffff'))

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes: pageRoutes
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')
