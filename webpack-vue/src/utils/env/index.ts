/**
 * 判断是否处于移动端环境
 * @returns boolean
 */
export function isMobile(): boolean {
  const reg =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  const flag: boolean = reg.test(navigator.userAgent);
  return flag;
}
