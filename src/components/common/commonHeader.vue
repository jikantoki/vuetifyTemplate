<template lang="pug">
v-app-bar
  template(v-slot:append)
    v-btn(icon="mdi-magnify")
    v-btn(icon="mdi-dots-vertical")
  v-app-bar-nav-icon(@click="toggleDrawer()")
  v-toolbar-title {{ PackageJson.name }}
v-navigation-drawer(v-model="drawer" fixed temporary)
  v-list(nav dense)
    v-list-item-group(v-model="group" active-class="deep-purple-text text--accent-4")
      v-list-item(v-for="navigationItem in NavigationList")
        li.nav(@click="a(navigationItem.url)")
          p {{ navigationItem.name }}
</template>

<script>
import PackageJson from '../../../package.json'
import Functions from '@/functions/Functions'
import NavigationList from '@/items/itemNavigationList'
export default {
  components: {},
  data() {
    return {
      PackageJson: PackageJson,
      NavigationList: NavigationList,
      Functions: Functions,
      drawer: false,
      group: null
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
        this.$router.push(url)
        if (this.drawer) this.drawer = false
        return 0
      }
    }
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
</style>
