<template>
  <div class="example-box">
    <el-input v-model="filterText" placeholder="Filter keyword" />

    <el-tree
      ref="treeRef"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      accordion
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :filter-node-method="filterNode"
      @node-expand="handleExpand"
    />
  </div>
  <div class="flex-box">
    <div class="orange-container center-box">
      <div class="orange-box">orange</div>
      <div class="orange-box">orange</div>
      <div class="orange-box">orange</div>
      <div class="orange-box">orange</div>
      <div class="orange-box">orange</div>
    </div>
    <div class="blue-box center-box">blue</div>
    <div class="blue-box center-box">blue</div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  // treeRef.value!.filter(val)
  // TODO: filter即可完成Tree的筛选功能，无需手动处理
  const nodeData = getNodesByLabel(val)
  console.log(nodeData)
  console.log(treeRef.value)
  treeRef.value!.setCurrentKey(nodeData.id)
  treeRef.value!.getNode(nodeData.id)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const handleExpand = (nodeData, node, instance) => {
  console.log(node)
  console.log(instance)
}

const getNodesByLabel = (value: string) => {
  return flatObjArr(data).find(item => {
    return item.label.includes(value)
  })
}

const flatObjArr = (data) => {
  return data.reduce((arr, {id, label, children = []}) =>
    arr.concat([{id, label}], flatObjArr(children)), []);
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
.example-box {
  border: 1px solid #666;
  /* background-color: #eee; */
}
.flex-box {
  display: flex;
  width: 1300px;
  padding: 50px;
  margin-top: 50px;
  border: 1px solid red;
  .orange-container {
    border: 1px solid orange;
    flex: 1;
    .orange-box {
      width: 200px;
    }
  }
  .blue-box {
    flex-shrink: 0;
    margin: 20px;
    width: 200px;
    height: 120px;
    border: 1px solid blue;
  }
  .center-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>