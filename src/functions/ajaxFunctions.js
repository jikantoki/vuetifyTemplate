/**
 * ### ajaxFunctionsモジュールの中身
 * - send: URLとメソッドを指定し、送信してpromiseを返す
 */
export default {
  /**
   * ## Ajax処理の実行
   * 注意: POSTに対応していないURLにPOSTした場合、404が返されます
   * ___
   * ### 使い方
   * ```js
    ajaxFunctions.send(url,{example:'example'}).then((value) => {
      console.log(value)
    }).catch((error) => {
      console.log(error)
    })
   * ```
   * ___
   * ### returnの中身
   * ```js
    return {
      ajaxで貰った内容,
      body: 'もしajax結果がJSONじゃなかったらレスポンス内容はここに',
      isText: bool, //JSONじゃなかったらTrue、JSONならundefined
      ajaxInfo: {
        status: int, //HTTPステータス
        statusText: string, //Not Foundとかが入る
        url: string, //リクエストしたURL
        timeout: int //タイムアウトしたらなんか入ると思う
      }
    }
   * ```
   *
   * @param url {string} URL（フルパスかルートディレクトリから入力）
   * @param isPost {bool} trueならPOST、false（default）ならGET
   * @returns object もし結果がJSONならObjectに変換するし、それ以外でもreturn.bodyに格納します
   */
  send: (url, obj = null, isPost = false) => {
    let methods = isPost ? 'POST' : 'GET'
    /**
     * resolve(hogehoge)で実行環境のthenが発火する
     * reject(piyopiyo)で実行環境のcatchが発火する
     */
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      request.onreadystatechange = () => {
        if (request.readyState == 4) {
          if (request.status === 200) {
            //console.log(request)
            let response
            try {
              response = JSON.parse(request.response)
            } catch {
              response = {
                body: request.response,
                isText: true
              }
            }
            response.ajaxInfo = {
              status: request.status,
              statusText: request.statusText,
              url: request.responseURL,
              timeout: request.timeout
            }
            resolve(response)
          } else {
            reject({
              ajaxInfo: {
                status: request.status,
                statusText: request.statusText,
                url: request.responseURL,
                timeout: request.timeout
              }
            })
          }
        }
      }
      let params = ''
      let postMethod = ''
      if (obj) {
        const objKeys = Object.keys(obj)
        objKeys.forEach((key) => {
          const encoded = encodeURI(obj[key])
          params += `${key}=${encoded}&`
        })
        params = params.slice(0, -1)
        if (!isPost) {
          url += '?' + params
        } else {
          postMethod = params
        }
      }
      request.open(methods, url, true)
      request.setRequestHeader(
        'content-type',
        'application/x-www-form-urlencoded;charset=UTF-8'
      )
      request.send(postMethod)
    })
  }
}
