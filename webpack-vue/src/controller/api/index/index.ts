import type { IProps } from './type';

/**
 * 接口负责人名 - 获取服务列表
 * @param params 请求参数
 */
export function fetchServerList(headers: IProps) {
  return axios({
    url: '/xxx/list',
    method: 'GET',
    headers: { ...headers },
  });
}
