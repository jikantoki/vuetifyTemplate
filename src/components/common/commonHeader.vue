<template lang="pug">
v-app-bar
  template(v-slot:append)
    v-btn(icon="mdi-magnify")
    v-btn(icon="mdi-dots-vertical")
  v-app-bar-nav-icon(v-if="isRoot" @click="toggleDrawer()")
  v-btn(v-if="!isRoot" icon="mdi-keyboard-backspace" @click="back()")
  v-app-bar-title {{ $route.meta.title }}
v-navigation-drawer(v-model="drawer" fixed temporary)
  v-list(nav dense)
    v-list-item-group(v-model="group" active-class="deep-purple-text text--accent-4")
      v-list-item(v-for="navigationItem in NavigationList")
        li.nav(@click="a(navigationItem.url)")
          p {{ navigationItem.name }}
      v-list-item
        //v-btn(@click="changeTheme()") Click!
</template>

<script>
import PackageJson from '/package.json'
import Functions from '@/functions/Functions'
import NavigationList from '@/items/itemNavigationList'
import router, { currentMeta } from '@/router/router'
import { useTheme } from 'vuetify'
export default {
  components: {},
  data() {
    return {
      PackageJson: PackageJson,
      NavigationList: NavigationList,
      Functions: Functions,
      currentMeta: currentMeta,
      drawer: false,
      group: null,
      isRoot: false,
      theme: 'light',
      useTheme: useTheme()
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
    }
  },
  mounted() {
    const now = new URL(window.location.href)
    if (Functions.isRoot(now.pathname)) {
      this.isRoot = true
    } else {
      this.isRoot = false
    }
  },
  methods: {
    toggleDrawer() {
      if (this.drawer === false) {
        this.drawer = true
      } else {
        this.drawer = false
      }
    },
    /**
     * <p>aタグと同じ動きをするし、pjaxになる</p>
     * <p>外部URLの場合、新しいタブで開く</p>
     * @param {string} url 転送したいURL（ルートからのパス）
     * @returns {int} 内部リンクなら0、外部ドメインなら1
     */
    a(url) {
      if (url.slice(0, 4) === 'http') {
        window.open(url, '_blank')
        return 1
      } else {
        router.push(url)
        if (this.drawer) this.drawer = false
        return 0
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
li.nav {
  width: 100%;
  height: 3em;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover::after {
    content: '>';
    margin-left: 1em;
    font-weight: bold;
  }
}
.text-none {
  font-weight: normal;
  font-size: 1.3em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>
