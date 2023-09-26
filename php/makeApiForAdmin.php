<?php

require_once './settings.php';
require_once './functions/database.php';
require_once './functions/functions.php';
const API_LIST = 'api_list';
const API_SECRET_ID = 'secretId';
$availableApiList = SQLsearchTable(API_LIST);
if ($availableApiList) {
  $rand = SQLmakeRandomId(API_LIST, API_SECRET_ID);
  //api_listテーブルにランダムなAPIトークンを作成
  $apiToken = randomString(16);
  $apiAccessKey = randomString(16);
  $apiAccessKeyHashed = password_hash($apiAccessKey, PASSWORD_DEFAULT);
  SQLinsert(API_LIST, [
    API_SECRET_ID => $rand,
    'apiId' => $rand,
    'apiToken' => $apiToken,
    'apiAccessKey' => $apiAccessKeyHashed
  ]);
} else {
  echo 'DBのセットアップを先にやってね！';
}
