<template lang="pug">
v-app-bar
  template(v-slot:append)
    v-btn(icon="mdi-magnify")
    v-btn(icon="mdi-dots-vertical")
  v-app-bar-nav-icon(v-if="isRoot" @click="toggleDrawer()")
  v-btn(v-if="!isRoot" icon="mdi-keyboard-backspace" @click="back()")
  v-app-bar-title {{ $route.meta.title }}
v-navigation-drawer.pa-0(v-model="drawer" fixed temporary)
  v-list(nav dense)
    v-item-group(v-model="group" active-class="deep-purple-text text--accent-4")
      v-list-item.pa-4(link v-for="navigationItem in NavigationList" @click="a(navigationItem.url)")
          p.nav {{ navigationItem.name }}
      v-divider
      .themeSwitch.pa-4
        div Dark Theme
        v-list-item-action
          v-switch(v-model="isDarkTheme")
</template>

<script>
import PackageJson from '/package.json'
import Functions from '@/functions/Functions'
import MetaFunctions from '@/functions/metaFunctions'
import NavigationList from '@/items/itemNavigationList'
import router, { currentMeta } from '@/router/router'
import mixins from '@/functions/mixins'
export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      PackageJson: PackageJson,
      NavigationList: NavigationList,
      Functions: Functions,
      currentMeta: currentMeta,
      drawer: false,
      group: 1,
      isRoot: false,
      theme: 'light',
      isDarkTheme: false
    }
  },
  watch: {
    $route() {
      const now = new URL(window.location.href)
      if (Functions.isRoot(now.pathname)) {
        this.isRoot = true
      } else {
        this.isRoot = false
      }
    },
    isDarkTheme(isDark) {
      if (this.$vuetify.theme.global.name === 'light' && isDark) {
        this.$vuetify.theme.global.name = 'dark'
        MetaFunctions.setStatusColor('#222222')
      }
      if (this.$vuetify.theme.global.name === 'dark' && !isDark) {
        this.$vuetify.theme.global.name = 'light'
        MetaFunctions.setStatusColor('#FFFFFF')
      }
    }
  },
  mounted() {
    const now = new URL(window.location.href)
    if (Functions.isRoot(now.pathname)) {
      this.isRoot = true
    } else {
      this.isRoot = false
    }
    if (this.$vuetify.theme.global.name === 'light' && this.isDarkTheme) {
      this.$vuetify.theme.global.name = 'dark'
      MetaFunctions.setStatusColor('#222222')
    }
    if (this.$vuetify.theme.global.name === 'dark' && !isDarkthe) {
      this.$vuetify.theme.global.name = 'light'
      MetaFunctions.setStatusColor('#FFFFFF')
    }

    // タップ時の誤動作を防ぐためのスワイプ時の処理を実行しない最小距離
    const minimumDistance = 10
    // スワイプ開始時の座標
    let startX = 0
    let startY = 0
    // スワイプ終了時の座標
    let endX = 0
    let endY = 0
    this.nulling(endY)

    // 解説①：移動を開始した座標を取得
    window.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX
      startY = e.touches[0].pageY
    })

    // 解説②：移動した座標を取得
    window.addEventListener('touchmove', (e) => {
      endX = e.changedTouches[0].pageX
      endY = e.changedTouches[0].pageY
    })

    // 解説③：移動距離から左右or上下の処理を実行
    window.addEventListener('touchend', () => {
      // スワイプ終了時にx軸とy軸の移動量を取得
      // 左スワイプに対応するためMath.abs()で+に変換
      const distanceX = this.unsigned(endX - startX)
      const distanceY = this.unsigned(endY - startY)

      // 左右のスワイプ距離の方が上下より長い && 小さなスワイプは検知しないようにする
      if (distanceX > distanceY && distanceX > minimumDistance) {
        // スワイプ後の動作
        if (endX - startX > 0) {
          //rightswipe
          this.drawer = true
        }
      }

      // 上下のスワイプ距離の方が左右より長い && 小さなスワイプは検知しないようにする
      if (distanceX < distanceY && distanceY > minimumDistance) {
        // スワイプ後の動作
        //console.log('上下スワイプ')
      }
    })
  },
  methods: {
    toggleDrawer() {
      if (this.drawer === false) {
        this.drawer = true
      } else {
        this.drawer = false
      }
    },
    toggleTheme() {
      if (this.isDarkTheme) {
        this.$vuetify.theme.global.name = 'light'
        this.isDarkTheme = false
        MetaFunctions.setStatusColor('#FFFFFF')
      } else {
        this.$vuetify.theme.global.name = 'dark'
        this.isDarkTheme = true
        MetaFunctions.setStatusColor('#222222')
      }
    },
    /**
     * 同じドメイン、かつindexじゃない場所にいる場合はページを戻す
     * @param {bool} PleaseReturn trueの場合、ページを戻せない場合にreturnする
     */
    back(pleaseReturn = false) {
      const goHome = () => {
        router.push('/')
      }
      if (document.referrer === '') {
        if (!pleaseReturn) {
          goHome()
        }
        return -1
      }
      const referrer = new URL(document.referrer)
      const now = new URL(window.location.href)
      if (!referrer) {
        if (!pleaseReturn) {
          goHome()
        }
        return 1
      }
      if (referrer.host !== now.host) {
        if (!pleaseReturn) {
          goHome()
        }
        return 2
      }
      let isRoot = Functions.isRoot(now.pathname)
      if (isRoot) {
        if (!pleaseReturn) {
          goHome()
        }
        return 3
      } else {
        router.back()
        return 0
      }
    },
    changeTheme() {}
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 2em;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.text-none {
  font-weight: normal;
  font-size: 1.3em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.ripple {
  &:hover {
    box-shadow:
      0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  }
}
button {
  margin: 0.2em !important;
}
</style>
