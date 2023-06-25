<script setup>
import { ref } from 'vue'
import Filter from './components/Filter.vue';
import { getScoresList } from '../../api/student';

defineProps({
  msg: String,
})

// TODO: 与reactive的区别
const listData = ref([])
const tableLoading = ref(false)
const formData = ref({
  name: '',
  math: '',
  english: '',
  chinese: '',
})

const handleSearch = async () => {
  tableLoading.value = true
  const { data } = await getScoresList(formData.value)
  tableLoading.value = false
  // 无需提前添加exportLoading属性
  // data.forEach(item => { item.exportLoading = false })
  listData.value = data.list.slice(0, 20)
}
const handleExport = (scope) => {
  scope.row.exportLoading = true
  setTimeout(() => {
    scope.row.exportLoading = false
  }, 1000)
}

</script>

<template>
  <Filter :form-data="formData" @search="handleSearch" />
  <div class="color">hhh</div>
  <div class="color-opacity">standard</div>
  <el-button :disabled="tableLoading" @click="handleSearch">搜索</el-button>
  <el-table :data="listData" border style="width: 100%;margin-top:20px;">
    <el-table-column type="index" width="50" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="studentName" label="Name" width="180" />
    <el-table-column prop="chinese" label="chinese" min-width="180" />
    <el-table-column prop="math" label="math" min-width="180" />
    <el-table-column prop="english" label="english" min-width="180" />
    <el-table-column label="操作" min-width="180" >
      <template #default="scope">
        <el-button :disabled="scope.row.exportLoading" size="small" @click="handleExport(scope)"
          >Export</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.color {
  $pick-color: #EB2F96;
  // :root {
  //   --pink-color: #{$pick-color};
  // }
  --pink-color: #{$pick-color};
  // TODO: 怎么把css变量变成scss变量，从而用于Sass functions https://github.com/sass/sass/issues/2246
  $color: var(--pink-color);
  @debug "#{$color}";
  background-color: rgba($color, 1);
  color: $color;
  margin-bottom: 20px;
}
.color-opacity {
  $pinkColor: #EB2F96;
  background-color: rgba($pinkColor, 0.1);
  @debug "#{rgba($pinkColor, 0.1)}";
  color: $pinkColor;
}
</style>
