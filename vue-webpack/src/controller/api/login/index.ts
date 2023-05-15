import { post } from '@/utils/request';
import type { GetAuthResponse } from './type';

/**
 * leyoKey系统跳转登录
 * @returns meteor token
 * @backend 李发军
 */
export function leyoKeyLogin(): Promise<string> {
  return post({
    url: '/datacenter-meteor/meteor/lklogin/v100',
  });
}

/**
 * 获取账号权限
 * @param params 请求参数
 * @backend 李发军
 */
export function getAuth(): Promise<GetAuthResponse> {
  return post({
    url: '/datacenter-meteor/meteor/auth/getAuth/v100',
  });
}
