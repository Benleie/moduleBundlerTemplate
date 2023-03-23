import 'core-js'
import { createApp } from 'vue'
import App from './App.vue'
console.log(['main', 'dd'].includes('main'))
console.log(['index', 'dd'].includes('html'))
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining
const obj = {}
console.log(obj?.foo?.hhh)
createApp(App).mount('#app')
