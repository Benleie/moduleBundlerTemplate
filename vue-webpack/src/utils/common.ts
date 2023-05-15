import { Obj } from '@/types/common';

/**
 *
 * @param url 需要解析的 url
 * @returns 键值对形式的 queryString
 */
export function getParams(url: string): Obj {
  const urlArr = url.split('?');
  const queryString: string | undefined = urlArr[1] || urlArr[0];
  const res: Obj = {};
  if (queryString) {
    const queryParams: string[] = queryString.split('&');
    for (const item of queryParams) {
      const keyIndex: number = item.indexOf('=');
      const key: string = item.substring(0, keyIndex);
      const value: string = item.substring(keyIndex + 1);
      res[key] = value;
    }
  }
  return res;
}
