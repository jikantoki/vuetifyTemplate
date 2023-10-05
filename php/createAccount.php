<?php
//アカウント作成用API

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

makeAccount($_GET['username'], $_GET['password'], $_GET['mailaddress']);
