<template lang="pug">
.login(v-if="isShow")
  v-form.center
    img.ma-8(:src="require('@/assets/logo.png')")
    p.form-p.text-h6 アカウント新規登録
    v-container
      v-text-field(v-model="userName" label="ID" prepend-inner-icon="mdi-account-outline" required clearable)
      v-text-field(v-model="mailAddress" label="Mail Address" prepend-inner-icon="mdi-email-outline" required clearable)
      v-text-field(v-model="password" label="Password" prepend-inner-icon="mdi-lock-outline" :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showPassword = !showPassword" required)
      v-text-field(v-model="confirmPassword" label="Confirm Password" prepend-inner-icon="mdi-lock-outline" :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showPassword = !showPassword" required)
      .btns
        v-btn.round.submit(@click="login") Registar
        v-btn.round(@click="a('/login')") I have a account already
</template>

<script>
import mixins from '@/functions/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      /** 将来的にdivの一つとしてフォームを埋め込む用 */
      isShow: true,
      userName: '',
      mailAddress: '',
      password: '',
      confirmPassword: '',
      showPassword: false
    }
  },
  mounted() {
    if (localStorage.userId) {
      this.userName = localStorage.userId
    }
  },
  unmounted() {
    if (this.userName) {
      localStorage.userId = this.userName
    } else {
      localStorage.userId = ''
    }
  },
  methods: {
    login() {}
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: contents;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }
}
.btns {
  display: flex;
  flex-direction: row-reverse;
  .round {
    border-radius: 9999px;
  }
  .submit {
    background-color: var(--accent-color);
    color: var(--accent-text-color);
  }
}
img {
  height: 8em;
  object-fit: contain;
}
.form-p {
  text-align: center;
}
</style>
