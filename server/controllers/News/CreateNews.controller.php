<?php

header('Content-Type: application/json');
include_once('../../config/CORS.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include_once('../../database/Database.php');
}
