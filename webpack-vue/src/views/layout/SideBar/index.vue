<script lang="ts" setup>
  import { useAppStore } from '@store/app';
  import { MenuItem } from '@/types/layout';
  import { Router, useRouter } from 'vue-router';
  import { Ref } from 'vue';
  import { useMenuStoreWithoutSetup } from '@store/menu';

  const router: Router = useRouter();
  const appStore = useAppStore();
  const menuStore = useMenuStoreWithoutSetup();
  const currentRoute = computed(() => router.currentRoute.value.path);
  const menuRef: Ref = ref(null);
  const menuProps = {
    children: 'children',
    label: 'label',
  };
  const isCollapsed = computed(() => appStore.menuCollapsed);
  const menus = computed(() => menuStore.menus);
  console.log('menus: ', menus);
  const menuMap = computed(() => {
    const menuMapping = new Map();
    for (const menuItem of menus.value) {
      const { children, path } = menuItem;
      if (children && children.length) {
        for (const childMenu of children) {
          menuMapping.set(childMenu.path, path);
        }
      }
    }
    return menuMapping;
  });
  const isActiveRoute = (path: string) => {
    return path === currentRoute.value;
  };
  const isActiveMenu = (path: string) => {
    const isActiveSupMenu = path === menuMap.value.get(currentRoute.value);
    return isActiveRoute(path) || isActiveSupMenu;
  };
  const getIcon = (item: MenuItem) => {
    const { path, icon, activeIcon } = item;
    if (isActiveMenu(path)) {
      return activeIcon || icon;
    }
    return icon;
  };
  const toggleMenu = (): void => {
    appStore.collapseMenu();
  };
</script>

<template>
  <div class="page-layout-side-bar">
    <el-menu
      ref="menuRef"
      :props="menuProps"
      :collapse="isCollapsed"
      :default-active="currentRoute"
      router
    >
      <div v-for="(item, index) in menus" :key="index">
        <el-sub-menu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
        >
          <template #title>
            <ly-icon
              v-if="getIcon(item)"
              :icon="getIcon(item)"
              width="16"
              height="16"
            />
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item
            v-for="(itemSub, indexSub) in item.children"
            :key="indexSub"
            :index="itemSub.path"
          >
            <div class="pl-1">
              <ly-icon
                v-if="getIcon(itemSub)"
                :icon="getIcon(itemSub)"
                width="16"
                height="16"
              />
              <span>{{ itemSub.label }}</span>
            </div>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <ly-icon :icon="getIcon(item)" width="16" height="16" />
          <span>{{ item.label }}</span>
        </el-menu-item>
      </div>
    </el-menu>
    <div class="collapse-btn" @click.stop="toggleMenu">
      <ly-icon
        :icon="isCollapsed ? 'i-menu-expand' : 'i-menu-collapse'"
        width="16"
        height="16"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-layout-side-bar {
    @apply relative;
    padding-top: 30px;

    max-width: 250px;
    height: 100%;
    background-color: #fff;
    overflow: auto;

    .menu-icon {
      width: 14px;
      height: 14px;

      & + span {
        margin-left: 15px;
      }
    }

    :deep(.el-menu) {
      height: 100%;
      border-right: none;
      background-color: transparent;

      &:not(.el-menu--collapse) {
        width: 192px;
      }

      .el-menu-item,
      .el-sub-menu__title {
        @apply transition-all;

        height: 40px;
        color: #666;

        &:hover {
          color: var(--sidebar-color-active);
          background-color: transparent;
        }
        &.is-active {
          color: var(--sidebar-color-active);
          border-right: 3px solid var(--sidebar-color-active);
          background-color: var(--sidebar-background-color-active);
        }
      }

      &.el-menu--collapse {
        --el-menu-item-height: 40px;
        .el-menu-item,
        .el-sub-menu__title {
          span {
            width: 0;
            height: 0;
            overflow: hidden;
          }
        }
        .el-sub-menu__icon-arrow {
          display: none;
        }
      }

      .el-sub-menu {
        .el-menu-item {
          min-width: auto;
        }
        &.is-active {
          .el-sub-menu__title {
            color: var(--sidebar-color-active);
            .el-sub-menu__icon-arrow {
              color: #666;
            }
          }
        }
      }
    }

    .collapse-btn {
      @apply absolute cursor-pointer;

      bottom: 24px;
      left: 50%;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      transform: translate(-50%, 0);
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
