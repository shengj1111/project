<template>
  <div class="outer">
    <MyHeader></MyHeader>
    <router-view></router-view>
    <MyFooter v-show="$route.meta.isShow"></MyFooter>
  </div>
</template>

<script>
import MyHeader from '@/components/header/index.vue'
import MyFooter from '@/components/footer/index.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    //向仓库发送请求 ||在app组件里面只需要发送一个请求，性能更优化
    this.$store.dispatch('cateGoryList')
  },
}
</script>

<style></style>
