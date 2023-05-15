import { RouteRecordName, LocationQuery, RouteParams } from 'vue-router';

export declare interface NavInstance {
  label: RouteRecordName | null | undefined;
  path: string;
  active?: boolean;
  closable?: boolean;
  query?: LocationQuery;
  params?: RouteParams;
}

export declare interface ScrollObject {
  scrollLeft?: number;
  scrollTop?: number;
}

/** 侧边栏菜单项 */
export declare interface MenuItem {
  /** 图标 */
  icon: string;
  /** 激活时的图标 */
  activeIcon?: string;
  /** 菜单文本 */
  label: string;
  /** 路径 */
  path: string;
  /** 顶层标识，用于归组子菜单 */
  topKey?: string;
  /** 子菜单 */
  children?: MenuItem[];
}
