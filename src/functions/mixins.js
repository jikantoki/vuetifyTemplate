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
    }
  }
}
