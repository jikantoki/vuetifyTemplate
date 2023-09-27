export default {
  /**
   * WebPushを許可する仕組み
   * ```js
   * set().then((e) => {
   *   console.log(e) //requestが返り値
   * }).catch((e) => {
   *   console.log(e) //エラー理由
   * })
   * ```
   * @returns promise
   */
  set: async () => {
    return new Promise((resolve, reject) => {
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
            reject(false)
          }

          if (permission === 'granted') {
            console.log('すでにWebPushを許可済みです')
            //ここでreturnしてもシステム上問題ないが、トークンをconsole.logしたいので続行
            //return 'allowed
          }
          const request = await getRequest()

          if (request) {
            resolve(request)
          } else {
            reject(false)
          }
        } else {
          reject(false)
        }
      })
    })
  },

  /**
   * プッシュ通知の許可が出ているか確認し、許可ならrequestに必要な鍵を返す
   * @param {bool} listenFlag Trueの場合はリクエストを出す、Falseなら現在の権限に委ねる
   * @returns object
   */
  get: async (listenFlag) => {
    return await getRequest(listenFlag)
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

/**
 * リクエストを取得する
 * サービスワーカー登録済みならsetを使わずgetRequestで十分
 * @param ListenFlag {string} Trueの場合はユーザーに尋ねる、falseの場合は権限に委ねる
 * @returns リクエスト
 */
const getRequest = async (listenFlag = false) => {
  /**
   * 共通変数
   */
  const PUBLIC_KEY = process.env.VUE_APP_WebPush_PublicKey
  // 取得したPublicKeyを「UInt8Array」形式に変換する
  const applicationServerKey = urlB64ToUint8Array(PUBLIC_KEY)

  // push managerにサーバーキーを渡し、トークンを取得
  let subscription = undefined

  let permission = Notification.permission
  if (permission === 'granted' || listenFlag) {
    if (permission !== 'granted' && listenFlag) {
      Notification.requestPermission()
        .then(() => {})
        .catch(() => {
          //error
          return false
        })
    }
    if (permission === 'granted') {
      try {
        //スマホで特定の環境だと止まる？？？
        subscription = await window.sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey
        })
      } catch (e) {
        //エラーで取得不可
        console.warn(e)
        return false
      }
    } else {
      return false
    }
  } else {
    //Permission denied
    console.warn('Permission denied')
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
  return request
}
