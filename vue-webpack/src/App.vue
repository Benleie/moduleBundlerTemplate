<script setup lang="ts">
  import { useAppStore } from '@store/app';
  import { Header, SideBar, KeepAliveView } from '@/views/layout';
  import DeviceWatcher from '@/mixins/device-watcher';
  import { appInit, appInitialized } from '@/utils/app';

  const appStore = useAppStore();
  const headerEnabled = computed(() => appStore.layoutConfig.header);
  const sideBarEnabled = computed(() => appStore.layoutConfig.sideBar);

  DeviceWatcher();
  onMounted(appInit);
</script>

<template>
  <el-config-provider>
    <div class="page-container">
      <Header v-if="headerEnabled" />
      <div class="page-layout-main">
        <SideBar v-if="sideBarEnabled" />
        <div
          class="page-layout-main__right"
          :class="{
            'page-layout-main__right--headerEnabled': headerEnabled,
            'page-layout-main__right--sideBarEnabled': sideBarEnabled,
          }"
        >
          <div class="content-container">
            <KeepAliveView v-if="appInitialized" />
          </div>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
  @import './assets/styles/variables.scss';

  .page-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: auto;

    .page-layout-main {
      display: flex;
      width: 100%;
      height: 100%;

      &__right {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0 $s-5 $s-5;
        background-color: $bg-color-soft;

        .content-container {
          height: 100%;
        }
      }
    }
  }
</style>
