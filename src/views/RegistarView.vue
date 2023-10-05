<template lang="pug">
.login(v-if="isShow")
  v-form.center
    img.ma-8(:src="require('@/assets/logo.png')")
    p.form-p.text-h6 アカウント新規登録
    v-container
      v-text-field(v-model="userName" name="id" label="ID" prepend-inner-icon="mdi-account-outline" required clearable)
      v-text-field(v-model="mailAddress" name="mail" label="Mail Address" prepend-inner-icon="mdi-email-outline" required clearable)
      v-text-field(v-model="password" name="password" label="Password" prepend-inner-icon="mdi-lock-outline" :type="showPassword ? 'text' : 'password'" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showPassword = !showPassword" required)
      v-text-field(v-model="confirmPassword" name="confirmPassword" label="Confirm Password" prepend-inner-icon="mdi-lock-outline" :type="showConfirmPassword ? 'text' : 'password'" :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="showConfirmPassword = !showConfirmPassword" required)
      p(v-if="invalidPassword") パスワードが正しくありません
      .btns
        v-btn.round.submit(@click="registar") Registar
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
      showPassword: false,
      showConfirmPassword: false,
      invalidPassword: false
    }
  },
  watch: {
    password() {
      this.invalidPassword = false
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
    registar() {
      if (this.password !== this.confirmPassword) {
        this.invalidPassword = true
        return false
      }
      this.sendAjax(process.env.VUE_APP_API_HOST + '/createAccount.php', {
        username: this.userName,
        password: this.password,
        mailaddress: this.mailAddress,
        apiid: process.env.VUE_APP_API_ID,
        apitoken: process.env.VUE_APP_API_TOKEN,
        apipassword: process.env.VUE_APP_API_PASSWORD
      })
        .then((e) => {
          console.log(e)
        })
        .catch((e) => {
          console.log(e)
        })
    }
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
