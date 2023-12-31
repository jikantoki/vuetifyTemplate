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

このプログラムは、表示用サーバーと処理用サーバーの2つが必要です

### 表示用サーバー

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

### PHPサーバー（内部処理用）

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
```

#### PHPサーバー用の.htaccessの用意

大体こんな感じで設定する

```htaccess
#トップページを/vuetifyTemplate/php にする
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteBase /
RewriteRule ^$ vuetifyTemplate/php/ [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ vuetifyTemplate/php/$1 [L]
</IfModule>
# 外部からのAPIへのアクセスを許可
Header append Access-Control-Allow-Origin: "*"

```

### MySQLの用意

後で書く

### デフォルトAPIのトークンを用意する

このプログラムは独自のアクセストークンを利用してAPIにアクセスします。  
そのため、初回APIを登録する作業が必要です。

1. セットアップしたAPI用サーバーの/makeApiForAdmin.phpにアクセス
2. 初回アクセス時のみMySQLで登録作業が行われるので、出てきた画面の内容をコピー
3. 以後、その値を使ってAPIを操作できます

**忘れたらリセット**するしかないので注意！（一部データは暗号化されており、管理者でも確認できません）

#### デフォルトAPIトークンのリセット方法

1. MySQLのapi_listテーブルのsecretId='default'を削除
2. 初回登録と同じ感じでやる
3. データベースに再度defaultが追加されていることを確認

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
