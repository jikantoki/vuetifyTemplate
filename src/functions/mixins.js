/**
 * ここに記述したものはVueの機能として使える
 * しかもどのファイルでも読み込める
 */

import router from '@/router/router'
export default {
  data() {
    return {
      cookieAllowed: false
    }
  },
  methods: {
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
     * 0未満なら-1で乗算する
     * @param {int, float} number 変換したい数値
     * @returns 正の値
     */
    unsigned(number) {
      if (number < 0) {
        return number * -1
      } else {
        return number
      }
    },
    /**
     * クッキーの特定のキーを取得
     * @param {string} name 取得したいCookieのキー
     * @returns キーがあればvalue、無ければnull
     */
    getCookie(name) {
      let c = new RegExp(name + '=[^;]+').exec(document.cookie)
      return c ? c[0].replace(name + '=', '') : null
    },
    /**
     * 全てのクッキーを連想配列で返す
     * クッキーが許可されてなければfalse
     * @returns cookie or null or false
     */
    getAllCookie() {
      if (this.cookieAllowed) {
        let cookie = document.cookie
        if (!cookie || cookie === '') {
          return null
        }
        let cookieArray = cookie.split(';')
        let newCookieArray = []
        for (const keyAndValue of cookieArray) {
          let keyValue = keyAndValue.split('=')
          newCookieArray.push(keyValue)
        }
        return newCookieArray
      } else {
        return false
      }
    },
    /**
     * クッキーをセットする
     * @param {string} key 設定したいキー
     * @param {*} value 設定したい値
     * @returns OKだったらTrue、許可がなかったらFalse
     */
    setCookie(key, value) {
      if (this.cookieAllowed) {
        document.cookie = `${key}=${value};`
        return true
      } else {
        return false
      }
    },
    checkCookie() {
      let isAllow = this.getCookie('cookieAllowed')
      this.cookieAllowed = isAllow
      return isAllow
    },
    /**
     * Cookieを許可する
     */
    allowCookie() {
      document.cookie = 'cookieAllowed=true;'
      this.allowCookie = true
    },
    /**
     * Cookieを拒否する
     */
    denyCookie() {
      document.cookie = 'cookieAllowed=false;'
      this.allowCookie = false
    },
    /**
     * 変数が使われてません！を無効化
     * @param {*} obj エラーを無効化したい変数
     * @returns objがtrueなら1
     */
    nulling(obj) {
      if (obj) return 1
    },
    crack() {
      alert('さてはオメー、ソースコードを見ているな！？！？！？')
      return 7095110
    }
  }
}
