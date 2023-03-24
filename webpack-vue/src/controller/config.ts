import { DeviceTypeEnum } from '@/types/common';
import { NavInstance, MenuItem } from '@/types/layout';

// App 配置
export const AppConfig: IAppConfig = {
  token: '',
  layoutConfig: {
    header: true,
    sideBar: true,
  },
  device: DeviceTypeEnum.PC,
  currentPath: '/index',
  menu: [],
  navList: [
    {
      label: '首页',
      path: '/index',
      active: false,
      closable: true,
    },
    {
      label: '登录页',
      path: '/login',
      active: true,
      closable: true,
    },
  ],
  loading: false,
  menuCollapsed: false, // 左侧菜单是否隐藏
};

// APP 唯一字符串标识
export const APP_UNIQUE_NAME = 'icarus';

interface LayoutConfig {
  sideBar: boolean;
  header: boolean;
}

export interface IAppConfig {
  token: string;
  layoutConfig: LayoutConfig;
  device: number;
  currentPath: string;
  menu: MenuItem[];
  navList: NavInstance[];
  loading: boolean;
  menuCollapsed: boolean;
  [prop: string]: unknown;
}
