<template lang="pug">
.wrap(v-if="isShow")
  v-card.pa-4.pop(elevation="4")
    .text-h6 {{ title }}
    p.my-4 {{ message }}
    v-btn(@click="isShow=false" v-for="action,key in actions" v-bind:class="[key === 0 ? 'first' : 'other']") {{ action.text }}
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      title: '',
      message: '',
      actions: []
    }
  },
  methods: {
    /**
     * ## ポップアップを表示
     * actions配列の仕様
     * ```js
     * actions = [
     *   {
     *     text: '表示したいテキスト',
     *     return: リターンしたいもの
     *   }
     * ]
     * ```
     * @param {string} title 表示したいタイトル
     * @param {string} message 表示したいメッセージ
     * @param {array} actions 配列の中にオブジェクトを入れる
     */
    pop(title, message, actions) {
      this.title = title
      this.message = message
      this.actions = actions
      this.isShow = true
      console.log(this.message)
      return 0
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: block;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(100, 100, 100, 0.4);
  .pop {
    border-radius: var(--border-radius);
    .v-btn {
      font-weight: bold;
      border-radius: 9999px;
      &.first {
        background-color: var(--accent-color);
        color: var(--accent-text-color);
      }
    }
  }
}
</style>
