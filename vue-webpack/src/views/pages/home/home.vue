<template>
  <div class="home-page">
    <PageHeader title="首页" back />
    <div class="home-page__content">
      首页内容，首页内容，首页内容，首页内容，首页内容。
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../../assets/styles/variables.scss';

  .home-page {
    height: 100%;

    &__content {
      padding: $s-6;
      border-radius: $border-radius-base;
      background-color: $bg-color-white;
    }
  }
</style>
