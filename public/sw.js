var CACHE_NAME = 'pwa-sample-caches'
/**
 * キャッシュしたいコンテンツ
 */
var urlsToCache = []

self.addEventListener('install', function (event) {
  //console.log('sw event: install called')

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function (event) {
  /*console.log('sw event: fetch called')*/

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response ? response : fetch(event.request)
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  /*console.log('sw event: notification clicked')*/
  event.notification.close()

  clients.openWindow('/')
  console.log('通知イベント' + event.action + 'を実行しました')
})

self.addEventListener('push', function (event) {
  //console.log('sw event: push called')
  /**
   * ## 通知の実装
   * notificationDataObjの中身
   * ```json
   * {
   *   "title": "Notification title",
   *   "option": { Option }
   * }
   * ```
   */
  let notificationDataObj
  try {
    notificationDataObj = event.data.json()
  } catch {
    notificationDataObj = {
      title: 'Webサイトからの通知',
      option: {
        body: event.data.text()
      }
    }
  }
  /**
   * titleの中身はstringな必要があります
   */
  let title = notificationDataObj.title
  /**
   * ## 通知オプションの書き方
   * actionsは2つまで実装可能
   *
   * actions.actionの中身をnotificationClickに渡します
   * ```json
   * {
   *   "body": "message",
   *   "icon": "icon_url",
   *   "tag": "tag(optional)",
   *   "actions": [
   *     {
   *       "action": "action_name",
   *       "title": "action_title"
   *     }
   *   ]
   * }
   * ```
   */
  let option = notificationDataObj.option
  event.waitUntil(self.registration.showNotification(title, option))

  /* notification example */
  /*
    {
      "title": "通知テスト",
      "option": {
        "body": "メッセージサンプル",
        "icon": "/img/icon192.png",
        "tag": "tag, warn",
        "actions": [
          {
            "action": "testA",
            "title": "アクションA"
          },
          {
            "action": "testB",
            "title": "アクションB"
          }
        ]
      }
    }
   */
})
