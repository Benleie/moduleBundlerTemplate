<template>
  <div class="login-page">
    <PageHeader title="登录页" back />
    <div class="login-page__content">
      登录页内容，登录页内容，登录页内容，登录页内容，登录页内容。
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../../assets/styles/variables.scss';

  .login-page {
    height: 100%;

    &__content {
      padding: $s-6;
      border-radius: $border-radius-base;
      background-color: $bg-color-white;
    }
  }
</style>
