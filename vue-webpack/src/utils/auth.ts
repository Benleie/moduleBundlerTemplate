import Cookies from 'js-cookie';
import { APP_UNIQUE_NAME } from '@/controller/config';

// token 的 storage 标识
const TOKEN_STRING = APP_UNIQUE_NAME + '_token';

export function setToken(token: string) {
  sessionStorage.setItem(TOKEN_STRING, token);

  Cookies.set(TOKEN_STRING, token);
}

export function getToken() {
  return sessionStorage.getItem(TOKEN_STRING) || Cookies.get(TOKEN_STRING);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_STRING);

  Cookies.remove(TOKEN_STRING);
}

/** 设置 leyoKey 加密过的 token */
export function setTokenAtob(str: string) {
  const token = window.atob(window.atob(str));
  setToken(token);
}
