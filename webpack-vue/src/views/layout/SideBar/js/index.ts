import type { RouteRecordNormalized } from 'vue-router';
import { MenuItem } from '@/types/layout';

/**
 * 根据权限数据和路由表，生成菜单树
 * @param routes 路由数据
 * @param modules 权限数据
 */
export function createMenuFormRoutes(
  routes: RouteRecordNormalized[],
  modules: string[],
) {
  const menus: MenuItem[] = [];
  const { level2Menus, normalMenus } = getMenus(routes, modules);
  // 插入二级菜单
  menus.forEach((item) => {
    const { topKey } = item;
    if (!topKey) return;
    item.children = level2Menus[topKey] || [];
  });
  return [
    ...menus.filter((item) => item.children && item.children.length > 0),
    ...normalMenus,
  ];
}

/**
 * 递归获取菜单数据
 * @param routes 路由数据
 * @param modules 权限数据
 */
function getMenus(routes: RouteRecordNormalized[], modules: string[]) {
  /** 明确的二级菜单 */
  const level2Menus: { [x: string]: MenuItem[] } = {};
  /** 当前层级的菜单 */
  const normalMenus: MenuItem[] = [];
  routes.forEach((route) => {
    const { meta, children, path } = route;
    const { menu, topMenu, module, label, icon } = meta;
    if (!menu) return; // 非菜单
    let authorized = true;
    if (module) {
      authorized = modules && modules.includes(module);
    }
    if (!authorized) return; // 无权限
    const menuItem: MenuItem = {
      icon: icon as string,
      label: label as string,
      path,
    };
    if (topMenu) {
      if (!level2Menus[topMenu]) level2Menus[topMenu] = [];
      level2Menus[topMenu].push(menuItem);
    } else {
      normalMenus.push(menuItem);
    }
    // 处理子菜单
    if (Array.isArray(children)) {
      const childMenus = getMenus(children as RouteRecordNormalized[], modules);
      menuItem.children = childMenus.normalMenus;
      Object.entries(childMenus.level2Menus).forEach(([key, value]) => {
        level2Menus[key].push(...value);
      });
    }
  });
  return { level2Menus, normalMenus };
}
