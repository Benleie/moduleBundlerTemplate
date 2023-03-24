import { RouteLocationNormalizedLoaded } from 'vue-router';

/** keep-alive 控制器 */
export class KeepAlive {
  list = ref<string[]>([]);
  constructor() {
    this.check = this.check.bind(this);
  }
  /** 校验路由是否 keep-alive */
  check(route: RouteLocationNormalizedLoaded) {
    const list = this.list.value;
    const { keepAlive } = route.meta;
    if (keepAlive && !list.includes(keepAlive)) {
      list.push(keepAlive);
    }
  }
}
