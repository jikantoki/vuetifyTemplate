<template lang="pug">
v-app.wrap100vh(ontouchstart="" style="min-height: 100vh!important;width:100vw")
  header
    common-header
  v-main
    .center
      router-view
      common-cookie-get-permission
  v-footer
    common-footer
.right-space(style="min-height: 100vh")
</template>

<script>
import PackageJson from '/package.json'
import Functions from '@/functions/Functions'
import commonHeader from '@/components/common/commonHeader.vue'
import commonFooter from '@/components/common/commonFooter.vue'
import commonCookieGetPermission from '@/components/common/commonCookieGetPermission'
import mixins from '@/functions/mixins'
import webpush from '@/webpush'

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
    commonFooter: commonFooter,
    commonCookieGetPermission: commonCookieGetPermission
  },
  mixins: [mixins],
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
    /*
    this.sendAjax('/api/test/object.html', {
      goodbye: 'バイバ～イ!yeah',
      sayMeow: 'みゃお'
    })
      .then((value) => {
        console.log(value)
      })
      .catch((e) => {
        console.warn(e)
      })
    this.sendAjax('/api/test/string.html')
      .then((value) => {
        console.log(value)
      })
      .catch((e) => {
        console.warn(e)
      })
    */
    webpush
      .set()
      .then((e) => {
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
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

<style lang="scss">
$breakpoints: (
  'smartPhone': 'screen and (max-width:900px)',
  'tablet': 'screen and (max-width:1400px)'
) !default;

/* フォント設定 */
$font: 'Zen Maru Gothic', sans-serif;
@import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap');
/* フォント設定ここまで */

@mixin mq($breakpoint) {
  @media #{map-get($breakpoints, $breakpoint)} {
    @content;
  }
}
$body-font-family: $font;
html,
body {
  height: 100vh !important;
}
:root {
  font-size: 16px;
  --color-allow: #cceeff;
  --color-error: #ffcccc;
}
* {
  user-select: none;
  list-style: none;
  transition: all 0.14s;
  font-family: $font !important;
}
#app {
  font-family: $font !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  nav {
    padding: 30px;
  }
  .center {
    width: 60%;
    margin: auto;
    @include mq('tablet') {
      width: 80%;
    }
    @include mq('smartPhone') {
      width: 100%;
    }
  }
  .text-h1 {
    font-size: 3em !important;
  }
  .text-h2 {
    font-size: 2.8em !important;
  }
  .text-h3 {
    font-size: 2.4em !important;
  }
  .text-h4 {
    font-size: 2.2em !important;
  }
  .text-h5 {
    font-size: 2em !important;
  }
  .text-h6,
  .text {
    font-size: 1.5em !important;
  }
  .text-h7,
  .text-small {
    font-size: 1em !important;
  }
  .text-h1,
  .text-h2,
  .text-h3,
  .text-h4,
  .text-h5,
  .text-h6 {
    font-family: $font !important;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
  }
  button {
    margin: 0.5em;
  }
  .content {
    width: 95%;
    display: flex;
    flex-direction: column;
    padding: 8px 16px;
    border-radius: 16px;
  }
  .wrap {
    display: flex;
    justify-content: center;
    padding: 8px 0px;
    flex-direction: column;
    align-items: center;
  }
  .wrap100vh {
    min-height: 100vh !important;
  }
  .ontext {
    height: 1em;
    vertical-align: middle;
    object-fit: cover;
  }
  hr {
    margin: 8px auto;
    width: 98%;
    align-items: center;
    border: 1px solid;
    opacity: 0.3;
  }
}
</style>
