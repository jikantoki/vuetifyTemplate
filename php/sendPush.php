<?php
require_once 'vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

const VAPID_SUBJECT = 'ここにあなたのWebサイトのURL（http://localhost:8080/ など）';
const PUBLIC_KEY = '公開鍵（ https://web-push-codelab.glitch.me/ で取得したもの ）';
const PRIVATE_KEY = '秘密鍵（ https://web-push-codelab.glitch.me/ で取得したもの ）';

// push通知認証用のデータ
$subscription = Subscription::create([
    'endpoint' => 'ブラウザのコンソールで表示されていた「endpoint」',
    'publicKey' => 'ブラウザのコンソールで表示されていた「publicKey」',
    'authToken' => 'ブラウザのコンソールで表示されていた「authToken」',
]);

// ブラウザに認証させる
$auth = [
    'VAPID' => [
        'subject' => VAPID_SUBJECT,
        'publicKey' => PUBLIC_KEY,
        'privateKey' => PRIVATE_KEY,
    ]
];

$webPush = new WebPush($auth);

$report = $webPush->sendOneNotification(
    $subscription,
    'push通知の本文です'
);

$endpoint = $report->getRequest()->getUri()->__toString();

if ($report->isSuccess()) {
    echo '送信成功ヽ(=´▽`=)ﾉ';
} else {
    echo '送信失敗(´；ω；｀)';
}
