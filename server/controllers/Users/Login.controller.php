<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['email']) || !isset($data['password'])) {
        $response = ['message' => 'Morate unijeti potrebne podatke za prijavu.'];
        echo json_encode($response);
        return;
    }

    include_once('../../database/Database.php');

    $email = $data['email'];
    $password = $data['password'];

    $checkUserCredentials = $db->prepare('SELECT * FROM users WHERE email = :email');
    $checkUserCredentials->bindParam(':email', $email, PDO::PARAM_STR);
    $checkUserCredentials->execute();

    if ($checkUserCredentials->rowCount() == 0) {
        $response = ['message' => 'Niste unijeli ispravne podatke za prijavu.'];
        echo json_encode($response);
        return;
    }

    $user = $checkUserCredentials->fetch(PDO::FETCH_ASSOC);

    if (!password_verify($password, $user['password'])) {
        $response = ['message' => 'Niste unijeli ispravne podatke za prijavu.'];
        echo json_encode($response);
        return;
    }

    $response = ['status' => 200, 'message' => 'Uspješno ste se prijavili.'];
    echo json_encode($response);
}
