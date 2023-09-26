<?php

require_once './settings.php';
require_once './functions/database.php';
$test = SQLshowTable();
var_dump($test);
$test = SQLsearchTable('usersList');
var_dump($test);
$test = SQLcreateTable('usersList');
var_dump($test);
$test = SQLshowTable();
var_dump($test);
