<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    include_once('../../database/Database.php');
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    if ($id) {
        $checkNews = $db->prepare('SELECT id FROM articles WHERE id = :id');
        $checkNews->bindParam(':id', $id, PDO::PARAM_INT);
        $checkNews->execute();

        if ($checkNews->rowCount() > 0) {
            $deleteNews = $db->prepare('DELETE FROM articles WHERE id = :id');
            $deleteNews->bindParam(':id', $id, PDO::PARAM_INT);
            $deleteNews->execute();

            echo json_encode(['message' => 'News deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'News not found']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid ID']);
    }
}
