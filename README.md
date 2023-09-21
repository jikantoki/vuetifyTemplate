# Vuetify Template

Vuetifyを簡単にインストールしてすぐ使うためのテンプレート

- NOLICENSED ご自由にお使いください

## 前提

Node.jsとnpmとyarnくらい入ってるよね！（投げやり）

## INCLUDED

- Vue CLI Service
- Vue3
- Vuetify3
- Vue-router
- VSCode、Git、Eslint、Prettier周りの設定ファイル
- PugとSASS
- PWA Preset
- ダークテーマ（切り替えボタンあり）
- Google Fonts
- Cookie API（独自実装）
- 画面を右スワイプでメニュー表示
- イイカンジにカスタマイズされたSCSSファイル
- コピペで使えるpugテンプレート

## 注意

ポート12345で動くようにしてあります  
VSCodeでの利用を推奨

-Vue3慣れてなくてOptions API使ってるけど許して-

## Setup

```shell
git clone git@github.com:jikantoki/vuetifyTemplate.git
echo 'これだけでセットアップ完了！'
echo 'Vercelとかでデプロイしたらそのまま動く'
```

## コンソール側で初期化

```shell
yarn install
```

### 実行

```shell
yarn serve
```

### 設定方法

| 項目               | 設定箇所                           |
| ------------------ | ---------------------------------- |
| アプリ名           | /package.json                      |
| フォント           | /src/app.vue                       |
| ナビゲーション     | /src/items/itemNavigationList.js   |
| ページ毎のメタ情報 | /src/router/router.js              |
| 404ページ          | /src/views/error/errorNotFound.vue |

### Compiles and minifies for production

```shell
yarn build
```

### Lints and fixes files

```shell
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
