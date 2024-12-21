<?php

session_start();
if (!empty($_SESSION['user_session']))
    return true;

if (empty($_POST['username']) || empty($_POST['password'])) {
    $data = ['message' => 'Morate unijeti potrebne podatke za prijavu.'];
    echo json_encode($data);
    return true;
}

include_once('../../database/Database.php');

$hash = "udb_hash";

// >> User login
$checkUserCredentials = $db->prepare('SELECT * FROM users WHERE username = :username AND password = :password');
$checkUserCredentials->bindParam(':username', $_POST['username'], PDO::PARAM_STR);
$checkUserCredentials->bindParam(':password', $hash, PDO::PARAM_STR);
$checkUserCredentials->execute();

if ($checkUserCredentials->rowCount() == 0) {
    $data = ['message' => 'Niste unijeli ispravne podatke za prijavu.'];
    echo json_encode($data);
    return true;
}

$_SESSION['user_session'] = $_POST['username'];
$data = ['status' => 200];
echo json_encode($data);
