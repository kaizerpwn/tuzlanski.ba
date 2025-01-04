<?php

include_once('../../config/CORS.php');
include_once('../../database/Database.php');

$category = isset($_GET['category']) ? $_GET['category'] : null;

if ($category) {
    $getAllNews = $db->prepare('SELECT * FROM articles WHERE category = :category ORDER BY id DESC');
    $getAllNews->bindParam(':category', $category, PDO::PARAM_STR);
} else {
    $getAllNews = $db->prepare('SELECT * FROM articles');
}

$getAllNews->execute();

$news = $getAllNews->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($news);
