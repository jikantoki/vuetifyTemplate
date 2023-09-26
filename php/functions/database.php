<?php
/**
 * 環境変数
 */
require_once '../../env.php';

$sql = 'mysql:host=' . MySQL_Host . ';dbname=' . MySQL_DBName . ';charset=utf8mb4';
try{
  echo $sql;
  $pdo = new PDO($sql, MySQL_User, MySQL_Password);
} catch(Exception $e) {
  echo $e->getMessage();
}
