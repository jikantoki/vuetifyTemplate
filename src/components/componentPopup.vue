<template lang="pug">
//.dont-swipeを付けないとバグる
.wrap.pop-wrap.dont-swipe(v-if="isShow")
  v-card.pa-4.pop.dont-swipe(elevation="4")
    .text-h6.dont-swipe {{ title }}
    p.my-4.dont-swipe {{ message }}
    .actions
      v-btn.pop-btns.dont-swipe(v-for="action,key in actions" @click="isShow=false;popClick(key)" v-bind:class="[key === 0 ? 'first' : 'other']") {{ action.text }}
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      title: '',
      message: '',
      resolveButtonClick: null,
      actions: []
    }
  },
  mounted() {},
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
    async pop(title, message, actions) {
      this.title = title
      this.message = message
      this.actions = actions
      this.isShow = true
      const result = await this.waitButtonClick()
      return result
    },
    waitButtonClick() {
      return new Promise((resolve) => {
        this.resolveButtonClick = resolve
      })
    },
    popClick(ret) {
      if (this.resolveButtonClick !== null) {
        this.resolveButtonClick(ret)
      }
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
  background-color: rgba(100, 100, 100, 0.5);
  .pop {
    border-radius: var(--border-radius);
    .actions {
      display: flex;
      flex-direction: row-reverse;
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
}
</style>
