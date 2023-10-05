<?php
//アカウント作成用API

require_once './settings.php';
require_once './functions/functions.php';
require_once './functions/database.php';

if (
  !isset($_GET['username']) ||
  !isset($_GET['password']) ||
  !isset($_GET['mailaddress']) ||
  !isset($_GET['apiid']) ||
  !isset($_GET['apitoken']) ||
  !isset($_GET['apipassword'])
) {
  echo 'GET要素が足りん（怒）';
  exit;
}
$isAPI = authAPI($_GET['apiid'], $_GET['apitoken'], $_GET['apipassword']);
var_dump($isAPI);
echo 'GETあるよ（笑）';

makeAccount($_GET['username'], $_GET['password'], $_GET['mailaddress']);
