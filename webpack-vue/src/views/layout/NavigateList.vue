<script lang="ts" setup>
  import LyIcon from '@/components/LyIcon.vue';
  import { useAppStore } from '@store/app';
  import { NavInstance, ScrollObject } from '@/types/layout';
  import { Ref } from 'vue';
  import { Router, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';

  const appStore = useAppStore();
  const navList = computed(() => appStore.navList);
  const router: Router = useRouter();
  const currentRoute: Ref<RouteLocationNormalizedLoaded> = router.currentRoute;

  // 处理滑动相关数据
  const scrollWrapper: Ref = ref(null);
  const scrollLeft = ref(0);

  //  处理手动滑动
  const updateScroll = (e: ScrollObject) => {
    scrollLeft.value = e.scrollLeft as number;
  };

  // 处理滚轮事件
  const handleMenuScroll = (e: WheelEvent) => {
    const { deltaY } = e;
    scrollWrapper.value.setScrollLeft(scrollLeft.value + deltaY / 4);
  };

  // 判断当前的路由是否活跃
  const isActive = (path: string): boolean => {
    return currentRoute.value.path === path;
  };

  // 移除 nav 块
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeTag = async (tag: NavInstance): Promise<any> => {
    try {
      if (isActive(tag.path)) {
        await ElMessageBox.confirm('是否离开当前页面？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        });
      }
      appStore.popNavigator(tag);
    } catch (error) {
      return false;
    }
  };

  // 点击 nav 块跳转到对应的页面
  const clickTag = (tag: NavInstance, event: MouseEvent): void => {
    const target: EventTarget | null = event.target;
    if (target) {
      updateScrollList(tag, target as HTMLElement);
    }
    router.push({
      path: tag.path,
      query: tag.query,
      params: tag.params || {},
    });
  };

  // 更新 scroll-wrapper 的位置
  const updateScrollList = (tag: NavInstance, ele: HTMLElement): void => {
    const boundingRect = (ele as HTMLElement).getBoundingClientRect();
    const wrapperRect = scrollWrapper.value.$el.getBoundingClientRect();
    let diff = 0;
    if (boundingRect.left < wrapperRect.left) {
      diff = -(wrapperRect.left - boundingRect.left + 50);
    } else if (boundingRect.right > wrapperRect.right) {
      diff = boundingRect.right - wrapperRect.right + 50;
    }
    if (diff) {
      scrollWrapper.value.setScrollLeft(scrollLeft.value + diff);
    }
  };

  // 监听路由变化，更新激活显示的块
  watch(currentRoute, async (val: Ref<RouteLocationNormalizedLoaded>) => {
    if (val) {
      const path: string = currentRoute.value.path;
      await nextTick();
      const navItem: NavInstance = navList.value.filter(
        (nav: NavInstance) => nav.path === path,
      )[0];
      const ele: HTMLElement = scrollWrapper.value
        ? scrollWrapper.value.$el.querySelectorAll('.is-active')[0]
        : undefined;
      ele && updateScrollList(navItem, ele);
    }
  });
</script>

<template>
  <div class="navigate-list">
    <template v-if="navList.length">
      <el-scrollbar
        ref="scrollWrapper"
        @scroll="updateScroll"
        @wheel.prevent="handleMenuScroll"
      >
        <div class="nav-list">
          <div
            v-for="item in navList"
            :key="item.path"
            class="nav-item"
            :class="{ 'is-active': isActive(item.path) }"
            @click="clickTag(item, $event)"
          >
            {{ item.label }}
            <div
              v-if="item.closable"
              class="close-tag"
              @click.stop="closeTag(item)"
            >
              <LyIcon use-el icon="i-close" width="14" height="14" />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  $color-primary: var(--el-color-primary);

  .navigate-list {
    @apply w-full flex flex-row flex-none justify-between items-center transition-all;

    height: 28px;

    .nav-list {
      @apply flex flex-row items-center flex-grow;

      .nav-item {
        @apply flex justify-center items-center flex-none cursor-pointer whitespace-nowrap;

        height: 28px;
        padding: 0 8px;
        border-radius: 4px;
        background-color: #f0f0f0;
        font-size: 12px;

        & + .nav-item {
          margin-left: 10px;
        }

        &.is-active {
          color: #fff;
          background-color: $color-primary;
        }

        .close-tag {
          @apply flex flex-none transition-all;

          margin-left: 4px;
        }

        &:hover {
          opacity: 0.85;
        }
      }
    }

    :deep(.el-scrollbar__thumb) {
      display: none;
    }
  }
</style>
