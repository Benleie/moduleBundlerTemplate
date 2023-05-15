import { createRouter, createWebHistory } from 'vue-router';
import { useAppStoreWithoutSetup } from '@store/app';
import { NavInstance } from '@/types/layout';
import { LoginRouters } from './modules';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {
        label: '首页',
      },
      component: () => import('@/views/pages/home/home.vue'),
    },
    ...LoginRouters,
  ],
});

router.afterEach((to) => {
  const appStore = useAppStoreWithoutSetup();
  const path = to.path;
  const { hideHeader, hideSideBar, label } = to.meta;
  const navigatorItem: NavInstance = {
    label,
    path,
    active: true,
    closable: path !== '/',
    query: to.query,
    params: to.params,
  };
  // 有效的菜单项才能加入顶部导航
  to.name && appStore.addNavigator(navigatorItem);
  appStore.setCurrentPath(path);
  appStore.setHeaderVisible(!hideHeader);
  appStore.setSidebarVisible(!hideSideBar);
});

export default router;
