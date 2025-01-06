<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    include_once('../../database/Database.php');

    $id = $_GET['id'];

    $checkQuery = $db->prepare('SELECT * FROM users WHERE id = :id');
    $checkQuery->execute(['id' => $id]);
    $user = $checkQuery->fetch();

    if ($user) {
        $deleteQuery = $db->prepare('DELETE FROM users WHERE id = :id');
        $deleteQuery->execute(['id' => $id]);

        echo json_encode(['message' => 'Korisnik uspješno obrisan']);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Korisnik nije pronađen']);
    }
}
