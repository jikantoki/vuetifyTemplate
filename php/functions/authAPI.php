<?php
require_once '../settings.php';
require_once '../functions/functions.php';
require_once '../functions/database.php';

function authAPI($id, $token, $password)
{
  $isFind = SQLfindSome('api_list', [
    [
      'key' => 'apiId',
      'value' => $id,
      'func' => '='
    ],
    [
      'key' => 'apiToken',
      'value' => $token,
      'func' => '='
    ]
  ]);
  if (!$isFind) {
    //アカウント不明
    return false;
  }
  return $isFind;
}
