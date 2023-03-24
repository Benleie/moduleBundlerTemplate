<script lang="ts">
  import { defineComponent } from 'vue';
  import { Router, useRouter } from 'vue-router';

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: '',
      },
      back: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const router: Router = useRouter();
      // 返回上一页
      const goBack = (): void => {
        router.go(-1);
      };
      return {
        goBack,
      };
    },
  });
</script>

<template>
  <div class="page-header">
    <h3>{{ title }}</h3>
    <div class="page-header__slot">
      <slot />
    </div>
    <div v-if="back" class="page-header__back-trigger" @click="goBack">
      <span class="back-icon"><i-darrowleft /></span>
      返回上一页
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    font-size: $large;
    color: $text-darker;
    line-height: $line-height-high;

    &__back-trigger {
      display: flex;
      align-items: center;
      font-size: $base;
      cursor: pointer;

      .back-icon {
        margin-right: 6px;
        width: 12px;
        height: 12px;
      }
    }
  }
</style>
