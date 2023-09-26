<?php

require_once './settings.php';
require_once './functions/database.php';
$test = SQLsearchTable('usersList');
var_dump($test);
