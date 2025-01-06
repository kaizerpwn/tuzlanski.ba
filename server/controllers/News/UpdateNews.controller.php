<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include_once('../../database/Database.php');
    include_once('../../models/Article.class.php');

    $thumbnailUrl = null;

    if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['thumbnail']['tmp_name'];
        $fileName = $_FILES['thumbnail']['name'];
        $fileSize = $_FILES['thumbnail']['size'];
        $fileType = $_FILES['thumbnail']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

        $uploadFileDir = '../../public/uploads/';
        if (!is_dir($uploadFileDir)) {
            mkdir($uploadFileDir, 0777, true);
        }
        $dest_path = $uploadFileDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $thumbnailUrl = 'http://localhost/news-portal-ipi-projekat-2/server/public/uploads/' . $newFileName;
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Došlo je do greške prilikom uploadanja slike."));
            exit();
        }
    }

    $data = json_decode($_POST['data'], true);

    if (
        !empty($data['id']) &&
        !empty($data['title']) &&
        !empty($data['category']) &&
        !empty($data['short_description']) &&
        !empty($data['description']) &&
        !empty($data['author'])
    ) {
        if (!is_array($data['subcategories']) || !is_array($data['keywords'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Neispravan format sub-kategorije i ključnih riječi."));
            exit();
        }

        if (!$thumbnailUrl) {
            $query = $db->prepare('SELECT thumbnail FROM articles WHERE id = ?');
            $query->execute([$data['id']]);
            $existingArticle = $query->fetch(PDO::FETCH_ASSOC);
            $thumbnailUrl = $existingArticle['thumbnail'];
        }

        $query = $db->prepare('UPDATE articles SET title = ?, thumbnail = ?, image_source = ?, images = ?, source_link = ?, category = ?, sub_categories = ?, short_description = ?, description = ?, keywords = ?, author = ?, language = ? WHERE id = ?');

        $result = $query->execute([
            $data['title'],
            $thumbnailUrl,
            $data['image_source'] ?? null,
            $data['images'] ?? null,
            $data['source_link'] ?? null,
            $data['category'],
            json_encode($data['subcategories']),
            $data['short_description'],
            $data['description'],
            json_encode($data['keywords']),
            $data['author'],
            $data['language'] ?? null,
            $data['id']
        ]);

        if ($result) {
            http_response_code(200);
            echo json_encode(array("message" => "Uspješno ste ažurirali vijest."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Nije moguće ažurirati vijest."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Niste unijeli sve podatke."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Nedozvoljena metoda."));
}
