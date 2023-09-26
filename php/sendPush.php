<?php
require_once '../vendor/autoload.php';
require_once '../.env.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

const VAPID_SUBJECT = 'dev.vuetemp.enoki.xyz';
const PUBLIC_KEY = VUE_APP_WebPush_PublicKey;
const PRIVATE_KEY = VUE_APP_WebPush_PrivateKey;

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
