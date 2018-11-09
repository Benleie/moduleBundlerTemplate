<template>
    <el-container class="layout-default">
        <el-header height="197px">
            <my-header/>
        </el-header>
        <el-main>
            <my-body/>
        </el-main>
        <el-footer height="100%">
            <my-footer/>
        </el-footer>
    </el-container>
</template>

<script>
import MyHeader from './layout/header/index.vue'
import MyBody from './layout/body/index.vue'
import MyFooter from './layout/footer/index.vue'
export default {
    components: {
        MyHeader,
        MyBody,
        MyFooter
    }
}
  // 
</script>

