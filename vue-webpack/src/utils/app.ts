import { ref } from 'vue';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import router from '@/controller/router/index';
import { setToken, getToken, setTokenAtob } from '@/utils/auth';
import { getParams } from '@/utils/common';
import * as login from '@/controller/api/login';
import { toLeyoKey, toLogin } from '@/utils/logout';
import { useUserStoreWithoutSetup } from '@store/user';

/** 登出的操作 */
let logout = toLogin;

const userStore = useUserStoreWithoutSetup();

/** app 初始化是否完成 */
export const appInitialized = ref(false);

/** 初始化 app */
export async function appInit() {
  routerInit();
  try {
    await handleToken();
    await userInit();
  } catch (error) {
    // console.warn('Login error:', error);
    logout();
  }
  appInitialized.value = true;
}

/** 用户初始化 */
export async function userInit() {
  const authInfo = await login.getAuth();
  const { modules, userInfo } = authInfo;
  if (modules === null) {
    ElMessage({ type: 'error', message: '此账号未设置业务权限' });
    throw '此账号未设置业务权限';
  }
  userStore.setUserInfo(userInfo);
  userStore.setModules(modules);
}

/** token 处理 */
async function handleToken() {
  const token = getUrlToken();
  if (token) {
    logout = toLeyoKey;
    await leyoKeyLogin(token);
  } else {
    checkCacheToken();
  }
}

/** 获取 url 的 token（leyoKey） */
export function getUrlToken(): string {
  const query = getParams(location.href);
  return query.token;
}

/** 从 leyoKey 跳转登入 */
async function leyoKeyLogin(leyoKeyToken: string) {
  setTokenAtob(leyoKeyToken);
  // 使用 leyoKey token 登入
  const meteorToken = await login.leyoKeyLogin();
  // 设置 meteor token
  setToken(meteorToken);
}

/** 检查是否有登录token缓存 */
function checkCacheToken() {
  const token = getToken();
  if (token) return;
  const message = '用户未登录';
  ElMessage({ type: 'error', message });
  throw new Error(message);
}

/** 在未完成初始化前，缓存的路由跳转指令 */
const lastNext: {
  to: null | RouteLocationNormalized;
  next: null | NavigationGuardNext;
} = {
  to: null,
  next: null,
};

/** 初始化路由权限判断拦截 */
function routerInit() {
  router.beforeEach((to, from, next) => {
    if (!appInitialized.value) {
      lastNext.to = to;
      lastNext.next = next;
    } else {
      beforeNext(to) && next();
    }
  });
}

/**
 * 路由跳转的权限判断
 * @param to 目标路由
 * @param unavailableTips 无权限是否提示，默认true
 * @returns 是否有跳转权限
 */
function beforeNext(to: RouteLocationNormalized, unavailableTips = true) {
  const modules = userStore.modules;
  const module = to.meta.module as string;
  let authorized = true;
  if (module) {
    authorized = modules && modules.includes(module);
  }
  if (!authorized) {
    unavailableTips && ElMessage({ type: 'warning', message: '无页面权限' });
  }
  return authorized;
}
