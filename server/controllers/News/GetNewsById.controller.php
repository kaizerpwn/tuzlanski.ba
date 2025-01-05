<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include_once('../../database/Database.php');
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    if ($id) {
        $getNewsById = $db->prepare('SELECT * FROM articles WHERE id = :id');
        $getNewsById->bindParam(':id', $id, PDO::PARAM_INT);
        $getNewsById->execute();

        $news = $getNewsById->fetch(PDO::FETCH_ASSOC);

        echo json_encode($news);
    }
}
