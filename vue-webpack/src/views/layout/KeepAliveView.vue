<script lang="ts">
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@store/user';
  import { KeepAlive } from '@/utils/keepAlive';

  export default {
    /** 路由keep-alive控制组件 */
    name: 'KeepAliveView',
  };
</script>

<script setup lang="ts">
  const route = useRoute();
  const keepAlive = new KeepAlive();
  const userStore = useUserStore();
  const componentNames = computed(() => keepAlive.list.value);

  keepAlive.check(route);

  watch(() => route, keepAlive.check, {
    deep: true,
  });

  watch(
    () => userStore.userInfo.id,
    (newVal) => {
      if (!newVal) {
        keepAlive.list.value.length = 0; // 清空页面缓存
      }
    },
  );
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="componentNames">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
