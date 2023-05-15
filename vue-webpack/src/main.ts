import { createApp } from 'vue';
import App from './App.vue';
import store from './controller/store';
import * as ElementIcons from '@element-plus/icons-vue';
import router from './controller/router';
import icons from './assets/icons';
import './assets/styles/main.scss';
import 'core-js';

console.log('test firefox54');
console.log(['ff'].includes(''));
console.log('ffff ff  '.trimEnd());

const app = createApp(App);

// 引入 element-plus 的所有 icon
for (const iconName in ElementIcons) {
  app.component(
    'i-' + iconName.toLocaleLowerCase(),
    // 规避 indexable 问题
    ElementIcons[iconName as keyof typeof ElementIcons],
  );
}

app.use(icons); // 全局注册 icon 组件，增强 svg icon
app.use(store);
app.use(router);
app.mount('#root');
