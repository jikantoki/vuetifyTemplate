export default {
  /**
   * WebPushを許可する仕組み
   */
  set: async () => {
    /**
     * 共通変数
     */
    const PUBLIC_KEY = process.env.VUE_APP_WebPush_PublicKey
    /**
     * サービスワーカーの登録
     */
    self.addEventListener('load', async () => {
      if ('serviceWorker' in navigator) {
        window.sw = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })
      }
      if ('Notification' in window) {
        let permission = Notification.permission

        if (permission === 'denied') {
          console.warn(
            'Push通知が拒否されているようです。ブラウザの設定からPush通知を有効化してください'
          )
          return false
        }

        if (permission === 'granted') {
          console.log('すでにWebPushを許可済みです')
          return false
        }
      }
      // 取得したPublicKeyを「UInt8Array」形式に変換する
      const applicationServerKey = urlB64ToUint8Array(PUBLIC_KEY)

      // push managerにサーバーキーを渡し、トークンを取得
      let subscription = undefined
      try {
        console.log(window.sw)
        subscription = await window.sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey
        })
      } catch (e) {
        console.warn(
          'Push通知機能が拒否されたか、エラーが発生したか、iPhoneでの実行かが原因でPush通知は送信されません。',
          e
        )
        return false
      }

      // 必要なトークンを変換して取得（これが重要！！！）
      const key = subscription.getKey('p256dh')
      const token = subscription.getKey('auth')
      const request = {
        endpoint: subscription.endpoint,
        publicKey: btoa(String.fromCharCode.apply(null, new Uint8Array(key))),
        authToken: btoa(String.fromCharCode.apply(null, new Uint8Array(token)))
      }
      console.log(request)
      console.log('OK')
    })
  }
}

/**
 * トークンを変換するときに使うロジック
 * @param {*} base64String
 */
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
