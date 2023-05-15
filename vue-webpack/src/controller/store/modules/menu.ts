import { defineStore } from 'pinia';
import router from '@/controller/router';
import { MenuItem } from '@/types/layout';
import { createMenuFormRoutes } from '@/views/layout/SideBar/js';
import store from '..';

/**
 * 菜单仓库
 */
export const useMenuStore = defineStore('menuStore', {
  state() {
    return {
      /** 菜单列表 */
      menus: [] as MenuItem[],
    };
  },
  actions: {
    /**
     * 根据权限数据和路由表，生成菜单树
     * @param modules 权限数据
     */
    createMenus(modules: string[]) {
      const routes = router.getRoutes();
      this.menus = createMenuFormRoutes(routes, modules);
    },
  },
});

export const useMenuStoreWithoutSetup = () => {
  return useMenuStore(store);
};
