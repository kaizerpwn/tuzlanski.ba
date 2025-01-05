<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include_once('../../database/Database.php');

    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $size = isset($_GET['size']) ? (int)$_GET['size'] : null;
    if ($category === 'Najnovije') $category = null;

    if ($category) {
        $query = 'SELECT COUNT(*) as news_count FROM articles WHERE category = :category';
        $countNews = $db->prepare($query);
        $countNews->bindParam(':category', $category, PDO::PARAM_STR);
    } else {
        $query = 'SELECT COUNT(*) as news_count FROM articles';
        $countNews = $db->prepare($query);
    }

    $countNews->execute();
    $news = $countNews->fetch(PDO::FETCH_ASSOC);

    $query = 'SELECT COUNT(*) as users_count FROM users';
    $countUsers = $db->prepare($query);
    $countUsers->execute();
    $users = $countUsers->fetch(PDO::FETCH_ASSOC);

    $query = 'SELECT COUNT(*) as todays_news_count FROM articles WHERE DATE(published_at) = CURDATE()';
    $countTodaysNews = $db->prepare($query);
    $countTodaysNews->execute();
    $todaysNews = $countTodaysNews->fetch(PDO::FETCH_ASSOC);

    $result = array_merge($news, $users, $todaysNews);

    echo json_encode($result);
}
