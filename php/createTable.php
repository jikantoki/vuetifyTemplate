<?php

require_once './settings.php';
require_once './functions/database.php';
$test = SQLshowTable();
var_dump($test);
$test = SQLsearchTable('usersList');
var_dump($test);
$test = SQL('create table usersList (id int, name varchar(10), col varchar(10))');
var_dump($test);
$test = SQLshowTable();
var_dump($test);
