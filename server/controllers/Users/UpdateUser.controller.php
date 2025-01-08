<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    include_once('../../database/Database.php');

    $data = json_decode(file_get_contents('php://input'), true);

    if (
        empty($data['id']) ||
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

    $id = trim($data['id']);
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
        $checkStmt = $db->prepare("SELECT * FROM users WHERE id = :id");
        $checkStmt->bindParam(':id', $id);
        $checkStmt->execute();
        $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if (!$existingUser) {
            http_response_code(404);
            echo json_encode(['error' => 'Korisnik nije pronađen.']);
            exit;
        }

        $stmt = $db->prepare("
            UPDATE users
            SET username = :username, email = :email, password = :password, date_of_birth = :date_of_birth, role = :role, updated_at = NOW()
            WHERE id = :id
        ");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':date_of_birth', $date_of_birth);
        $stmt->bindParam(':role', $role);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(['message' => 'Korisnik je uspješno ažuriran.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Došlo je do greške prilikom ažuriranja korisnika.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Greška na serveru: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Metoda nije dozvoljena.']);
}
