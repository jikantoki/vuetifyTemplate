<?php
require_once DIR_ROOT . '/php/settings.php';
require_once DIR_ROOT . '/php/functions/functions.php';
require_once DIR_ROOT . '/php/functions/database.php';

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
