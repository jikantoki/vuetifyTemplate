<?php

/**
 * 環境変数
 */
require_once DIR_ROOT . '/env.php';

/**
 * SQLに接続して、そのPDOを返す
 *
 * @return object
 */
function SQLConnect()
{
  $sql = 'mysql:host=' . MySQL_Host . ';dbname=' . MySQL_DBName . ';charset=utf8mb4';
  try {
    $pdo = new PDO($sql, MySQL_User, MySQL_Password);
    return $pdo;
  } catch (Exception $e) {
    echo $e->getMessage();
    return false;
  }
}

/**
 * SQL文を実行
 *
 * @param [string] $sql
 * @return object
 */
function SQL($sql)
{
  $pdo = SQLConnect();
  $stmt = $pdo->query($sql);
  return $stmt->fetch();
}

function SQLselectTable($tableName)
{
  return SQL('select * from "' . $tableName . '"');
}

function SQLshowTable()
{
  return SQL('show tables');
}

function SQLsearchTable($tableName)
{
  return SQL('show tables like "' . $tableName . '"');
}

/**
 * ## 新規テーブルの作成
 * 既にテーブルが存在する場合は1を返す
 *
 * ### $arrayの使い方
 * ```php
 * $array = ['キーの名前1'=>'付けたい型','キーの名前2'=>'付けたい型'...];
 * ```
 * 型指定に使えるもの→int、float、varchar(自然数)、text、datetime
 *
 * @param [string] $tableName
 * @param [object] $array
 * @return void
 */
function SQLcreateTable($tableName, $array)
{
  if (SQLsearchTable(($tableName))) {
    return 1;
  }
  $array_word = '';
  foreach ($array as $key => $val) {
    $array_word += $key . ' ' . $val . ',';
  }
  $array_word = mb_substr($array_word, 0, -1);
  return SQL('create table ' . $tableName . ' (' . $array_word . ')');
}
