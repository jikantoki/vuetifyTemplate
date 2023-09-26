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

function SQLselectTable($tableName)
{
  $pdo = SQLConnect();
  $stmt = $pdo->query('select * from "' . $tableName . '"');
  return $stmt->fetch();
}

function SQLshowTable()
{
  $pdo = SQLConnect();
  $stmt = $pdo->query('show tables');
  return $stmt->fetch();
}

function SQLcreateTable($tableName)
{
  $pdo = SQLConnect();
  $stmt = $pdo->query('show create table "' . $tableName . '"');
  return $stmt->fetch();
}

function SQLsearchTable($tableName)
{
  $pdo = SQLConnect();
  $stmt = $pdo->query('show tables like "' . $tableName . '"');
  return $stmt->fetch();
}
