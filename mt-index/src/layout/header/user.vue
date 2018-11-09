<template>
    <div class="m-user">
        <template v-if="user">
            欢迎您，
            <span class="username">{{ user }}</span>
            [
            <a to="/exit">退出</a>]
        </template>
        <template v-else>
            <a to="/login" class="login">立即登录</a>
            <a class="register" to="/register">注册</a>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: ''
        }
    },
    /* async mounted() {
        const { status, data: { user } } = await this.$axios.get('users/getUser')
        if (status === 200) {
            this.user = user
        }
    } */
}
</script>

<style lang="css">

</style>
