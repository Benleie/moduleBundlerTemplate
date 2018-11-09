import Vue from 'vue'
import App from './APP.vue'
import './assets/styles/index/index.scss'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'


const root = document.createElement('div');
document.body.appendChild(root)

new Vue({
	render: (h) => h(App)
}).$mount(root)