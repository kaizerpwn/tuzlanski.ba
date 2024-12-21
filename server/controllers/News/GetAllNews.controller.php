<?php

include_once('../../database/Database.php');

$getAllNews = $db->prepare('SELECT * FROM articles');
$getAllNews->execute();

$news = $getAllNews->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($news);
