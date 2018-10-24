<template>
  <div class="clickable">
    <button @click="show">这个页面能不能点击呀</button>
    <p>好好的一个页面，鼠标被禁用了吗</p>
  </div>
</template>


<script>
export default {
  methods:{
      show(){
          alert("ok!")
      }
  }
}
</script>

<style lang="stylus" scoped>
    .clickable  
        font-size 20px
        margin 20px 20px 20px 20px
        font-weight:30;
        & button{
            border 2px solid blue
        }
</style>

