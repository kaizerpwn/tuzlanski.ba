<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include_once('../../database/Database.php');

    $data = json_decode(file_get_contents('php://input'), true);

    if (
        empty($data['username']) ||
        empty($data['email']) ||
        empty($data['password']) ||
        empty($data['date_of_birth']) ||
        empty($data['role'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'Morate ispuniti sva polja.']);
        exit;
    }

    $username = trim($data['username']);
    $email = trim($data['email']);
    $password = trim($data['password']);
    $date_of_birth = trim($data['date_of_birth']);
    $role = trim($data['role']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email adresa nije validna.']);
        exit;
    }

    if (strlen($username) < 3) {
        http_response_code(400);
        echo json_encode(['error' => 'Korisničko ime mora imati minimalno 3 karaktera.']);
        exit;
    }

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'Lozinka mora imati minimalno 6 karaktera.']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        $checkStmt = $db->prepare("SELECT * FROM users WHERE email = :email");
        $checkStmt->bindParam(':email', $email);
        $checkStmt->execute();
        $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if ($existingUser) {
            http_response_code(409);
            echo json_encode(['error' => 'Već postoji korisnik sa ovakvim emailom.']);
            exit;
        }

        $stmt = $db->prepare("
            INSERT INTO users (username, email, password, date_of_birth, role, created_at, updated_at)
            VALUES (:username, :email, :password, :date_of_birth, :role, NOW(), NOW())
        ");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':date_of_birth', $date_of_birth);
        $stmt->bindParam(':role', $role);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(['message' => 'Korisnik je uspješno kreiran.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Došlo je do greške prilikom kreiranja korisnika.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Greška na serveru: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metoda nije dozvoljena.']);
}
