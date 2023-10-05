<?php
require_once './settings.php';
require_once './functions/functions.php';
require_once './functions/database.php';

if (
  !isset($_GET['username']) ||
  !isset($_GET['password']) ||
  !isset($_GET['mailaddress']) ||
  !isset($_GET['password'])
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
$status = 'uncertified';
/** パスワード */
$password = password_hash($_GET['password'], PASSWORD_DEFAULT);

$res = SQLinsert('user_list', [
  'secretId' => $secretId,
  'userId' => $userId
]);

$res = SQLinsert('user_secret_list', [
  'secretId' => $secretId,
  'password' => $password,
  'otp' => null
]);

$res = SQLinsert('user_profile_list', [
  'secretId' => $secretId,
  'icon' => null,
  'coverImg' => null,
  'name' => null,
  'message' => null
]);
