import PackageJson from '../../package.json'
import Functions from './Functions'

export default {
  /**
   * いい感じのタイトルを付ける
   * @param {string} newTitle 新しく付けたいタイトル
   * @returns 引数に合わせて設定したら0、デフォルトのまま設定したら1
   */
  setTitle: (newTitle) => {
    let siteName = PackageJson.name
    siteName = Functions.ifEnglishStartUpper(siteName)
    let pageTitle
    let returnCode
    if (newTitle) {
      pageTitle = `${newTitle} | ${siteName}`
      returnCode = 0
    } else {
      pageTitle = siteName
      returnCode = 1
    }
    document.title = pageTitle
    return returnCode
  },
  /**
   * メタタグを書き換える
   * @param {string} metaKey メタタグのキー（og:titleとかdescriptionとか）
   * @param {string} property セットしたい値
   */
  updateMeta: (metaKey, property) => {
    let returnCode
    const metaName = document.querySelector('meta[name="' + metaKey + '"]')
    if (metaName) {
      metaName.setAttribute('content', property)
      returnCode = 0
    } else {
      returnCode = 1
    }
    const metaProperty = document.querySelector(
      'meta[property="' + metaKey + '"]'
    )
    if (metaProperty) {
      metaProperty.setAttribute('content', property)
      returnCode += 0
    } else {
      returnCode += 2
    }
    return returnCode
  },
  /**
   * このプロジェクトの説明とか入ってる
   */
  PackageJson: PackageJson,
  /**
   * 前述した関数たち
   */
  Functions
}
