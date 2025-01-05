<?php

if (empty($_POST['email']) || empty($_POST['password'])) {
    $data = ['message' => 'Morate unijeti potrebne podatke za prijavu.'];
    echo json_encode($data);
    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include_once('../../database/Database.php');

    $hash = "udb_hash";

    $checkUserCredentials = $db->prepare('SELECT * FROM users WHERE email = :email AND password = :password');
    $checkUserCredentials->bindParam(':email', $_POST['email'], PDO::PARAM_STR);
    $checkUserCredentials->bindParam(':password', $hash, PDO::PARAM_STR);
    $checkUserCredentials->execute();

    if ($checkUserCredentials->rowCount() == 0) {
        $data = ['message' => 'Niste unijeli ispravne podatke za prijavu.'];
        echo json_encode($data);
        return true;
    }

    $data = ['status' => 200];
    echo json_encode($data);
}
