# Vuetify Template

Vuetifyを簡単にインストールしてすぐ使うためのテンプレート

- NOLICENSED ご自由にお使いください

## 前提

Node.jsとnpmとyarnくらい入ってるよね！（投げやり）
デプロイ先はVercelを想定してるけど多分どこでも動きます

## INCLUDED

- Vue CLI Service
- Vue3
- Vuetify3
- Vuetify ダークテーマ
- Vue-router
- VSCode、Git、Eslint、Prettier周りの設定ファイル
- PugとSASS
- PWA Preset
- Google Fonts

## 独自実装

- Cookie API
- Ajax API
- 画面を右スワイプでメニュー表示
- イイカンジにカスタマイズされたSCSSファイル
- コピペで使えるpugテンプレート
- 汎用性の高い関数群
- ダークテーマ切り替えボタン

## 制作予定

- Push API（使いやすいように改良）
- Notification API（使いやすいように改良）
- Google Firebase API
- リッチエディタ

## 注意

ポート12345で動くようにしてあります  
VSCodeでの利用を推奨

~~Vue3慣れてなくてOptions API使ってるけど許して~~

## 参考資料

WebPush https://tech.excite.co.jp/entry/2021/06/30/104213

## Setup

```shell
git clone git@github.com:jikantoki/vuetifyTemplate.git
echo 'これだけでセットアップ完了！'
echo 'Vercelとかでデプロイしたらそのまま動く'
```

### WebPush用の鍵を作成

ここで作れます https://web-push-codelab.glitch.me/

#### ストレージを操作できる環境の場合

ルートに.envファイルを作成し、以下のように記述（クォーテーション不要）

```env
VUE_APP_WebPush_PublicKey=パブリックキーをコピー
VUE_APP_WebPush_PrivateKey=プライベートキーをコピー
```

#### それ以外（Vercelデプロイ等）

Project Settings → Enviroment Variables を開く  
上記.envファイルと同じ感じで設定

### PHPサーバーの用意

サーバーサイドはPHPで開発しているため、一部処理を実行するにはPHPサーバーの用意が必要です  
とりあえずレンタルサーバーでも借りれば実行できます

1. API用のドメインをクライアント側（Vercel等）とは別で用意する
2. このリポジトリのphpフォルダをドメインのルートにする（.htaccess等で）
3. （準備中！！！）にAPI用のドメインを記述
4. リポジトリのルートから見た/env.phpに以下の記述をする

```php
<?php
define('VUE_APP_WebPush_PublicKey', 'パブリックキー');
define('VUE_APP_WebPush_PrivateKey', 'プライベートキー');
define('WebPush_URL', 'プッシュしたいURL');
define('WebPush_URL_dev', 'プッシュしたいURL（開発用）');

//ここから先の情報は、ブラウザで通知を許可するタイミングで見れる
define('WebPush_Browser_EndPoint', 'ブラウザコンソールに表示されているエンドポイント');
define('WebPush_Browser_PublicKey', 'ブラウザコンソールに表示されている公開鍵');
define('WebPush_Browser_authToken', 'ブラウザコンソールに表示されているトークン');

//以下、開発用で別URLを使う場合（使わない場合は本番用をコピペ）
define('WebPush_Browser_EndPoint_dev', '');
define('WebPush_Browser_PublicKey_dev', '');
define('WebPush_Browser_authToken_dev', '');
```

## コンソール側で初期化

```shell
yarn install
composer install #PHP用
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
