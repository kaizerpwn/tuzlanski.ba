<?php

include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include_once('../../database/Database.php');

    $data = json_decode(file_get_contents('php://input'), true);

    if (
        empty($data['username']) ||
        empty($data['email']) ||
        empty($data['password']) ||
        empty($data['dateOfBirth'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    $username = trim($data['username']);
    $email = trim($data['email']);
    $password = trim($data['password']);
    $dateOfBirth = trim($data['dateOfBirth']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address.']);
        exit;
    }

    if (strlen($username) < 3) {
        http_response_code(400);
        echo json_encode(['error' => 'Username must be at least 3 characters long.']);
        exit;
    }

    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 6 characters long.']);
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
            echo json_encode(['error' => 'A user with this email already exists.']);
            exit;
        }

        $stmt = $db->prepare("
            INSERT INTO users (username, email, password, date_of_birth, role, created_at, updated_at)
            VALUES (:username, :email, :password, :date_of_birth, 'user', NOW(), NOW())
        ");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':date_of_birth', $dateOfBirth);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(['message' => 'User registered successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to register user.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
