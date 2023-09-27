<template lang="pug">
.wrap
  v-card.content(elevation="4")
    .text-h1
      span VueTemp {{ PackageJson.version }}
      img.ontext(:src="require('@/assets/logo.png')")
    hr
    .text-h6 Vuetifyを簡単に構築できるサンプル
    .btns
      v-btn(@click="getRequest()") 通知を許可する
      v-btn(@click="pushForMe()") 通知送信テスト
      v-btn(@click="download('/download/vuetifyTemplate.apk','vuetifyTemplate.apk')") Download APK
      v-btn(@click="a('https://github.com/jikantoki/vuetifytemplate')") Github
    .input-area
      v-text-field.my-4(label="送りたい通知内容を入力" v-model="notificationText")
.wrap
  v-card.content(elevation="4")
    .text-h1 簡単で、美しい。
    hr
    .text VueTempで理想の作業効率化
    p {{ astatus }}
</template>

<script>
import mixins from '@/functions/mixins'
import webpush from '@/webpush'

export default {
  mixins: [mixins],
  data() {
    return {
      astatus: '',
      notificationText: '通知テスト12345🤓'
    }
  },
  mounted() {},
  methods: {
    getRequest: function () {
      this.astatus = 'wait...'
      webpush
        .get(true)
        .then((e) => {
          console.log(e)
          this.astatus = e
        })
        .catch((e) => {
          this.astatus = e
        })
    },
    pushForMe: async function () {
      const keys = await webpush.get()
      console.log(keys)
      if (!keys) {
        return false
      }
      this.sendAjax('https://api.vuetemp.enoki.xyz/sendPushForMe.php', {
        endpoint: keys.endpoint,
        publickey: keys.publicKey,
        authtoken: keys.authToken,
        message: this.notificationText
      })
        .then((e) => {
          console.log(e)
        })
        .catch((e) => {
          console.log(e)
        })
      return true
    }
  }
}
</script>

<style lang="scss" scoped></style>
