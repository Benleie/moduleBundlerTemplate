import { defineStore } from 'pinia';
import { UserInfo } from '@/controller/api/login/type';
import { useMenuStoreWithoutSetup } from './menu';
import store from '..';

const menuStore = useMenuStoreWithoutSetup();

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      /** 菜单权限 */
      modules: [] as string[],
      /** 用户信息 */
      userInfo: {} as UserInfo,
    };
  },
  actions: {
    setUserInfo(data: UserInfo) {
      this.userInfo = data;
    },
    setModules(data: string[]) {
      this.modules = data;
      menuStore.createMenus(data);
    },
  },
});

export const useUserStoreWithoutSetup = () => {
  return useUserStore(store);
};
