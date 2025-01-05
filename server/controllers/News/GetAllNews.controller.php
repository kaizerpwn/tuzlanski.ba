<?php

include_once('../../config/CORS.php');
include_once('../../database/Database.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $size = isset($_GET['size']) ? (int)$_GET['size'] : null;
    if ($category === 'Najnovije') $category = null;

    if ($category) {
        $query = 'SELECT * FROM articles WHERE category = :category ORDER BY id DESC';
        if ($size) {
            $query .= ' LIMIT :size';
        }
        $getAllNews = $db->prepare($query);
        $getAllNews->bindParam(':category', $category, PDO::PARAM_STR);
        if ($size) {
            $getAllNews->bindParam(':size', $size, PDO::PARAM_INT);
        }
    } else {
        $query = 'SELECT * FROM articles ORDER BY id DESC';
        if ($size) {
            $query .= ' LIMIT :size';
        }
        $getAllNews = $db->prepare($query);
        if ($size) {
            $getAllNews->bindParam(':size', $size, PDO::PARAM_INT);
        }
    }

    $getAllNews->execute();

    $news = $getAllNews->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($news);
}
