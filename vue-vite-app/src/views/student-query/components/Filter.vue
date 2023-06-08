<template>
  <el-form :inline="true" :model="formData" size="small">
    <el-form-item label="姓名">
      <el-input
        v-model="formData.name"
        clearable
        @keyup.enter.native="handleSearch"
      />
    </el-form-item>
    <el-form-item label="语文">
      <el-input
        v-model="formData.fff"
        clearable
        @keyup.enter.native="handleSearch"
      />
    </el-form-item>
    <el-form-item label="数学">
      <el-input
        v-model="formData.math"
        clearable
        @keyup.enter.native="handleSearch"
      />
    </el-form-item>
    <el-form-item label="英语">
      <el-input
        v-model="formData.english"
        clearable
        @keyup.enter.native="handleSearch"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'FilterComp',
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      autoCompleteValue: '', // 用于模糊搜索展示
      areaCodeList: [],
      lineOptions: [],
    }
  },
  created() {
    this.$nextTick(() => this.handleSearch())
  },
  methods: {
    handleSearch() {
      this.$emit('search')
    },
  },
}
</script>
