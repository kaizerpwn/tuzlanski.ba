<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include_once('../../database/Database.php');
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $size = isset($_GET['size']) ? (int)$_GET['size'] : 10;
    $offset = ($page - 1) * $size;

    if ($category === 'Najnovije') $category = null;

    if ($category) {
        $countQuery = 'SELECT COUNT(*) as total FROM articles WHERE category = :category';
        $countStmt = $db->prepare($countQuery);
        $countStmt->bindParam(':category', $category, PDO::PARAM_STR);
    } else {
        $countQuery = 'SELECT COUNT(*) as total FROM articles';
        $countStmt = $db->prepare($countQuery);
    }
    $countStmt->execute();
    $totalItems = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    $query = $category ?
        'SELECT * FROM articles WHERE category = :category ORDER BY id DESC LIMIT :size OFFSET :offset' :
        'SELECT * FROM articles ORDER BY id DESC LIMIT :size OFFSET :offset';

    $getAllNews = $db->prepare($query);

    if ($category) {
        $getAllNews->bindParam(':category', $category, PDO::PARAM_STR);
    }
    $getAllNews->bindParam(':size', $size, PDO::PARAM_INT);
    $getAllNews->bindParam(':offset', $offset, PDO::PARAM_INT);

    $getAllNews->execute();

    $news = $getAllNews->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'items' => $news,
        'currentPage' => $page,
        'pageSize' => $size,
        'totalItems' => $totalItems,
        'totalPages' => ceil($totalItems / $size)
    ]);
}
