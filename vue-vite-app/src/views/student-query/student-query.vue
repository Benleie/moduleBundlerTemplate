<script setup>
import { ref } from 'vue'
import { getStudentData } from '../../api/student'

defineProps({
  msg: String,
})

// TODO: 与reactive的区别
const listData = ref([])
const tableLoading = ref(false)

const handleSearch = async () => {
  tableLoading.value = true
  const data = await getStudentData()
  tableLoading.value = false
  // 无需提前添加exportLoading属性
  // data.forEach(item => { item.exportLoading = false })
  listData.value = data
}
const handleExport = (scope) => {
  scope.row.exportLoading = true
  setTimeout(() => {
    scope.row.exportLoading = false
  }, 1000)
}
</script>

<template>
  <div class="color">hhh</div>
  <el-button :disabled="tableLoading" @click="handleSearch">搜索</el-button>
  <el-table :data="listData" border style="width: 100%;margin-top:20px;">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" min-width="180" />
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
  $color: #EB2F96;
  background-color: rgba($color, 0.1);
  color: $color;
  margin-bottom: 20px;
}
</style>
