<template lang="pug">
v-app(ontouchstart="")
  header
    common-header
  v-main
    router-view
  v-footer
    common-footer
</template>

<script>
import PackageJson from '/package.json'
import Functions from '@/functions/Functions'
import commonHeader from '@/components/common/commonHeader.vue'
import commonFooter from '@/components/common/commonFooter.vue'

export default {
  /**
   * Appが定番
   */
  name: 'App',
  /**
   * 使いたいvueファイルを記述
   */
  components: {
    commonHeader: commonHeader,
    commonFooter: commonFooter
  },
  /**
   * このファイル内で使うthisで始まる変数
   */
  data() {
    /**
     * この中に書かないと使えない
     */
    return {}
  },
  /**
   * 監視したい変数を記述
   */
  watch: {},
  /**
   * ページ生成時にやりたい事
   */
  mounted() {
    PackageJson.name = Functions.ifEnglishStartUpper(PackageJson.name)
  },
  /**
   * ページ離脱時にやりたい事
   */
  unmouonted() {},
  /**
   * このファイル内で使いたい変数
   */
  methods: {}
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  list-style: none;
  transition: all 0.14s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
