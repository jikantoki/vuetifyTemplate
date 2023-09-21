<template lang="pug">
v-card(elevation="12" width="256" loading v-if="!cookieAllowed")
  v-list-item(three-line)
    v-list-item-title.text-h6 We need Cookie!
    v-list-item-subtitle.text-h7 クリックすることで利用規約に同意し、クッキーの使用を許可します。
  v-card-actions
    v-btn(@click="allowCookie()") Allow Cookie
</template>

<script>
import mixins from '@/functions/mixins'
export default {
  mixins: [mixins],
  mounted() {
    this.checkCookie()
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  position: fixed;
  right: 10%;
  top: 10%;
}
.v-btn {
  //background-color: $color-allow;
  background-color: var(--color-allow);
}
</style>
