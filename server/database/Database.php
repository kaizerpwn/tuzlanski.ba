
<?php
$MYSQL_INFO = "mysql:host=localhost;dbname=news-database";
$MYSQL_USER = "root";
$MYSQL_PASSWORD = "";

$db = new PDO($MYSQL_INFO, $MYSQL_USER, $MYSQL_PASSWORD);

$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>