<script setup>
import { ref,onMounted } from 'vue'
import { initChart } from './echartsConfig';

defineProps({
  msg: String,
})

const count = ref(0)
onMounted(() => {
  initChart()
})
</script>

<template>
  <div id="main"></div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
#main {
  width: 800px;
  height: 500px;
}
</style>
