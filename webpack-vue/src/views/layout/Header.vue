<script setup lang="ts">
  import NavigateList from './NavigateList.vue';
  import LEYO_LOGO from '@/assets/images/leyo-logo.png';
  import { APP_NAME } from '@/constants/common';

  // 处理下拉框的点击事件
  const handleInfoCommand = (cmd: string): void => {
    console.log('cmd: ', cmd);
  };

  const searchQuery = '';

  const createTicket = () => {
    console.log('创建工单');
  };
</script>

<template>
  <div class="page-layout-header">
    <div class="page-layout-header__logo-container">
      <img class="logo" :src="LEYO_LOGO" />
      {{ APP_NAME }}
    </div>
    <div class="page-layout-header__navigate-list">
      <NavigateList />
    </div>
    <div class="page-layout-header__operation-container">
      <el-input
        v-model="searchQuery"
        class="search-area"
        placeholder="搜索单号"
      >
        <template #suffix>
          <el-icon><i-search /></el-icon>
        </template>
      </el-input>
      <el-button class="create-button" type="primary" @click="createTicket">
        <el-icon><i-plus /></el-icon>
        创建工单
      </el-button>
      <el-dropdown
        class="account-operation-dropdown"
        trigger="click"
        placement="bottom"
        @command="handleInfoCommand"
      >
        <div class="account-operation-dropdown__user-name">
          {{ `你好，欢迎登陆 ${APP_NAME}` }}
        </div>
        <template #dropdown>
          <el-dropdown-item
            class="account-operation-dropdown__item"
            command="logout"
          >
            退出登录
          </el-dropdown-item>
          <el-dropdown-item
            class="account-operation-dropdown__item"
            command="changePassword"
          >
            修改密码
          </el-dropdown-item>
          <el-dropdown-item
            class="account-operation-dropdown__item"
            command="switchAccount"
          >
            切换账号
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/styles/variables.scss';

  .page-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    padding: 0 $s-5;
    box-shadow: 0 0 14px 0 rgb(0, 0, 0, 6%);
    z-index: $z-index-normal;

    &__logo-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      margin-right: 24px;
      width: 172px;
      min-width: fit-content;
      font-weight: $bold;
      white-space: nowrap;

      .logo {
        width: 60px;
        height: 60px;
        border-radius: $border-radius-base;
        margin-right: $s-4;
      }
    }

    &__navigate-list {
      @apply flex-auto overflow-hidden mr-1;
    }

    &__operation-container {
      display: flex;

      .search-area {
        width: 260px;
      }

      .create-button {
        margin-left: 24px;

        .el-icon {
          margin-right: 4px;
        }
      }

      .account-operation-dropdown {
        display: inline-flex;
        align-items: center;
        margin-left: 24px;
        white-space: nowrap;
      }
    }
  }
</style>
