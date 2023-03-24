<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LyIcon',
    props: {
      /** 是否使用 element-plus 图标 */
      useEl: {
        type: Boolean,
        default: false,
      },
      /**
       * 图标名
       * @iconType i-[图标名小写] 使用 element-plus 图标
       * @iconType i-[图标文件名] 使用自定义 svg 图标，文件路径 src/assets/icons
       */
      icon: {
        type: String,
        default: '',
      },
      width: {
        type: [Number, String],
        default: 50,
      },
      height: {
        type: [Number, String],
        default: 50,
      },
    },
    computed: {
      iconSize() {
        return { width: this.width + 'px', height: this.height + 'px' };
      },
      icarusIcon() {
        return `#${this.icon}`;
      },
    },
  });
</script>

<template>
  <span class="ly-icon" :style="iconSize">
    <svg
      v-if="!useEl && icon"
      :class="'icarus-icon_' + icon"
      :width="width"
      :height="height"
    >
      <use :xlink:href="icarusIcon" />
    </svg>
    <component :is="icon" v-if="useEl" :style="iconSize" />
  </span>
</template>
