<?php

/**
 * 環境変数
 */
require_once '../env.php';
require_once './functions/database.php';
$test = SQLsearchTable('usersList');
var_dump($test);
