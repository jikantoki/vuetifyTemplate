<?php
require_once './settings.php';
require_once './functions/functions.php';
require_once './functions/database.php';

if (
  !isset($_GET['username']) ||
  !isset($_GET['password']) ||
  !isset($_GET['mailaddress'])
) {
  echo 'GET要素が足りん（怒）';
  exit;
}
echo 'GETあるよ（笑）';

/** 未使用なランダムID */
$secretId = SQLmakeRandomId('user_list', 'secretId');
/** ユーザーが自由に選べるID */
$userId = $_GET['username'];
/** 現在のunixtime */
$createdAt = time();
/** アカウントステータス:未認証 */
$status = 'unauthed';
$res = SQLinsert('user_list', [
  'secretId' => $secretId,
  'userId' => $userId
]);
