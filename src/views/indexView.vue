<template lang="pug">
.text-h1 VueTemp {{ PackageJson.version }}
.text-h6 Vuetifyを簡単に最速に構築できるサンプル
v-btn(@click="a('https://github.com/jikantoki/vuetifytemplate')") Github
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
