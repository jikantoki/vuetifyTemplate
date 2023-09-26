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
