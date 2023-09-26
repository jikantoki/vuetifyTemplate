<template lang="pug">
.wrap
  v-card.content(elevation="4")
    .text-h1
      span VueTemp {{ PackageJson.version }}
      img.ontext(:src="require('@/assets/logo.png')")
    hr
    .text-h6 Vuetifyを簡単に構築できるサンプル
    .btns
      v-btn(@click="a('https://github.com/jikantoki/vuetifytemplate')") Github
      v-btn(@click="console.log(setCookie('test', '001'))") Add Cookie
      v-btn(@click="console.log(getAllCookie())") Get Cookie
      v-btn(@click="push('Hello')") Push notification
      v-btn(@click="download('/download/vuetifyTemplate.apk','vuetifyTemplate.apk')") Download APK
.wrap
  v-card.content(elevation="4")
    .text-h1 簡単で、美しい。
    hr
    .text VueTempで理想の作業効率化
</template>

<script>
import mixins from '@/functions/mixins'
export default {
  mixins: [mixins],
  data() {
    return {}
  },
  mounted() {
    console.log(process.env)
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
