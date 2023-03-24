import { defineStore } from 'pinia';
import { AppConfig, IAppConfig } from '@/controller/config';
import { DeviceTypeEnum } from '@/types/common';
import { NavInstance } from '@/types/layout';
import { RouteRecord } from 'vue-router';
import Router from '@/controller/router';
import store from '..';

export const useAppStore = defineStore('appStore', {
  state: (): IAppConfig => {
    return {
      ...AppConfig,
    };
  },
  actions: {
    // 设置客户端类型
    setDevice(val: DeviceTypeEnum) {
      this.device = val;
    },
    collapseMenu(val = !this.menuCollapsed) {
      this.menuCollapsed = val;
    },
    // 设置顶部栏是否显示
    setHeaderVisible(payload = false) {
      this.layoutConfig.header = payload;
    },
    // 设置侧边栏是否显示
    setSidebarVisible(payload = false) {
      this.layoutConfig.sideBar = payload;
    },
    // 更新当前路由
    setCurrentPath(payload = '') {
      this.currentPath = payload;
      for (const item of this.navList) {
        if (item.path === payload) {
          item.active = true;
        } else {
          item.active = false;
        }
      }
    },
    // 添加顶部导航栏
    addNavigator(navigatorItem: NavInstance) {
      const path = navigatorItem.path;
      if (path) {
        const navigatorList: NavInstance[] = this.navList;
        const targetIndex: number = navigatorList.findIndex(
          (v: NavInstance) => v.path === path,
        );
        if (targetIndex == -1) {
          navigatorList.push(navigatorItem);
        } else {
          navigatorList.splice(targetIndex, 1, navigatorItem);
        }
        // 处理首页逻辑
        const staticIndex: number = navigatorList.findIndex(
          (v: NavInstance) => v.path === '/',
        );
        let indexRoute: NavInstance | undefined = navigatorList[staticIndex];
        if (indexRoute === undefined) {
          const sourceIndexRoute: RouteRecord | undefined =
            Router.getRoutes().find((v: RouteRecord) => v.path === '/');
          if (sourceIndexRoute) {
            indexRoute = {
              path: sourceIndexRoute.path,
              label: sourceIndexRoute.meta.label as string,
              query: {},
              params: {},
            };
          }
        } else {
          staticIndex > -1 && navigatorList.splice(staticIndex, 1);
          navigatorList.unshift(indexRoute);
        }
      }
    },
    // 弹出顶部导航栏
    popNavigator({ path = '' } = {}) {
      const index = this.navList.findIndex((v: NavInstance) => v.path === path);
      if (index !== -1) {
        this.navList.splice(index, 1);
        if (this.currentPath === path) {
          // 如果关闭的是当前的路由
          const nextIndex = this.navList.length === index ? index - 1 : index;
          const nextNav: NavInstance = this.navList[nextIndex];
          let nextPath = '/';
          let nextQuery = {};
          let nextParams = {};
          if (nextNav && nextNav.path) {
            nextPath = nextNav.path;
            nextQuery = nextNav.query || {};
            nextParams = nextNav.params || {};
          }
          Router.push({
            path: nextPath,
            query: nextQuery,
            params: nextParams,
          });
        }
      }
    },
  },
});

export const useAppStoreWithoutSetup = () => {
  return useAppStore(store);
};
