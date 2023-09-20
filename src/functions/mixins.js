/**
 * ここに記述したものはVueの機能として使える
 * しかもどのファイルでも読み込める
 */

import router from '@/router/router'
export default {
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
     * 変数が使われてません！を無効化
     * @param {*} obj エラーを無効化したい変数
     * @returns objがtrueなら1
     */
    nulling(obj) {
      if (obj) return 1
    }
  }
}
