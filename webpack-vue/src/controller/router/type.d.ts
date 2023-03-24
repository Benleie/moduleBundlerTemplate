import 'vue-router';

declare module 'vue-router' {
  /** 改造 meta 类型 */
  export interface RouteMeta {
    /** 菜单文本 */
    label?: string;
    /** 定义用于 keep-alive 的 key */
    keepAlive?: string;
    /** 是否隐藏顶部导航栏 */
    hideHeader?: boolean;
    /** 是否隐藏侧边菜单栏 */
    hideSideBar?: boolean;
    /** 是否需要覆盖水印 */
    mark?: boolean;
  }
}
