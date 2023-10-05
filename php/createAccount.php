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
