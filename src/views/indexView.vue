<template lang="pug">
.wrap
  v-card.content(elevation="4")
    .text-h1 VueTemp {{ PackageJson.version }}
    .text-h6 Vuetifyを簡単に構築できるサンプル
    .btns
      v-btn(@click="a('https://github.com/jikantoki/vuetifytemplate')") Github
      v-btn(@click="console.log(setCookie('test', '001'))") Add Cookie
      v-btn(@click="console.log(getAllCookie())") Get Cookie
      v-btn(@click="push('Hello')") Push notification
</template>

<script>
import PackageJson from '/package.json'
import mixins from '@/functions/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      PackageJson: PackageJson
    }
  }
}
</script>

<style lang="scss" scoped></style>
