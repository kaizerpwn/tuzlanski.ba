<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include_once('../../database/Database.php');

    $users = $db->query('SELECT * FROM users')->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);
}
