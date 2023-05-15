import router from '@/controller/router/index';
import type { UserInfo } from '@/controller/api/login/type';
import { useUserStoreWithoutSetup } from '@store/user';
import { clearToken } from './auth';
const userStore = useUserStoreWithoutSetup();

/** 完全登出（前后端） */
export async function fullLogout() {
  userStore.setUserInfo({} as UserInfo); // 清空登录信息
  userStore.setModules([]);
  logout();
}

/**
 * 登出处理（前端）
 * 清除 token 并跳转到登录入口
 */
export function logout() {
  clearToken();
  toLogin();
}

/**
 * 跳转到登录页
 */
export function toLogin() {
  router.push('/login');
}

/**
 * 跳转到 leyoKey
 */
export function toLeyoKey(redirectPath?: string, delay = 1000, authPath = '') {
  const origin =
    process.env.VUE_APP_AUTH_DOMAIN || 'https://auth.leyopharm.com/#/';
  const targetUrl = origin + authPath;
  let finalHref = targetUrl;
  if (redirectPath) {
    redirectPath = encodeURIComponent(window.btoa(redirectPath));
    finalHref += `?redirect=${redirectPath}`;
  }
  setTimeout(() => {
    window.location.href = finalHref;
  }, delay);
}
