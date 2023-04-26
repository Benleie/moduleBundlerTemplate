<script setup>
import { ref } from 'vue'
import { getStudentData }  from '../../api/student'
defineProps({
  msg: String,
})

// TODO: 与reactive的区别
const listData = ref([])

const handleSearch = async () => {
  const data = await getStudentData()
  console.log(data)
  listData.value = data
}
</script>

<template>
  <el-button @click="handleSearch">搜索</el-button>
  <el-table :data="listData" border style="width: 100%;margin-top:20px;">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" min-width="180" />
  </el-table>
</template>

<style scoped>

</style>
